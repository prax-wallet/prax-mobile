#![recursion_limit = "256"]

pub mod view_server;
use anyhow::Result;
use once_cell::sync::OnceCell;
use penumbra_keys::keys::SpendKey;
use penumbra_keys::{test_keys, FullViewingKey};
use penumbra_proto::box_grpc_svc::{self, BoxGrpcService};
use penumbra_proto::view::v1::view_service_client::ViewServiceClient;
use penumbra_proto::view::v1::view_service_server::ViewServiceServer;
use penumbra_proto::view::v1::{TransparentAddressRequest, TransparentAddressResponse};
use penumbra_view::ViewServer;
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::sync::RwLock;
uniffi::setup_scaffolding!();

/// Global state
static APP_STATE: OnceCell<AppStateContainer> = OnceCell::new();

/// RPC endpoint
const ENDPOINT: &str = "https://testnet.plinfra.net";

#[derive(uniffi::Object)]
struct AppState {
    view_server: Option<Arc<ViewServer>>,
    /// Arc<Mutex<_>> is counterintuitive here, but required to get around the stringent
    /// 'static lifetime requirements uniffi enforces. Arc enables shared ownership of
    /// the mutex, but mutex itself ensures a single thread acquires the lock and acquires
    /// the critical section. Arc<Mutex<_>> exceptionally enables sharing the Mutex itself
    /// across thread boundaries, eg. `spawn_blocking` in some view service client methods.
    view_service_client: Option<Arc<Mutex<ViewServiceClient<BoxGrpcService>>>>,
    spend_key: Option<SpendKey>,
    full_viewing_key: Option<FullViewingKey>,
}

/// A wrapper type compatible with Uniffi.
/// Uses `RwLock` to enable safe concurrent access to the `AppState`.
#[derive(uniffi::Object)]
struct AppStateContainer {
    state: RwLock<AppState>,
}

#[derive(Debug, thiserror::Error, uniffi::Error)]
pub enum AppError {
    #[error("{0}")]
    General(String),
    #[error("View server error: {0}")]
    ViewServer(String),
}

/// Initializes the application state inside the `AppState`.
fn init_app_state() -> RwLock<AppState> {
    RwLock::new(AppState {
        view_server: None,
        view_service_client: None,
        spend_key: None,
        full_viewing_key: None,
    })
}

/// Top-level initialization method exposed to Uniffi. Initializes an `AppStateContainer`
/// and stores it in the global `APP_STATE`.
#[uniffi::export]
pub async fn create_app_state_container() -> Result<bool, AppError> {
    let container = AppStateContainer {
        state: init_app_state(),
    };

    APP_STATE
        .set(container)
        .map_err(|_| AppError::General("app state already initialized".to_string()))?;

    Ok(true)
}

/// Initializes and starts the View Server.
#[uniffi::export(async_runtime = "tokio")]
pub async fn start_server() -> Result<bool, AppError> {
    let state = APP_STATE
        .get()
        .ok_or("app state not initialized")
        .expect("starting server");

    let view_server = match ViewServer::load_or_initialize(
        None::<&str>,
        None::<&str>,
        &penumbra_keys::test_keys::FULL_VIEWING_KEY,
        ENDPOINT.parse().unwrap(),
    )
    .await
    {
        Ok(vs) => vs,
        Err(e) => return Err(AppError::ViewServer(e.to_string())),
    };

    // Acquire exclusive write lock and saves keys and server state.
    let mut state = state.state.write().await;
    state.spend_key = Some(test_keys::SPEND_KEY.clone());
    state.full_viewing_key = Some(test_keys::FULL_VIEWING_KEY.clone());
    state.view_server = Some(Arc::new(view_server.clone()));

    // Creates grpc service and client synchronously.
    let vs_tonic = ViewServiceServer::from_arc(view_server.clone().into());
    let vsc = ViewServiceClient::new(box_grpc_svc::local(vs_tonic.clone()));
    state.view_service_client = Some(Arc::new(Mutex::new(vsc.into())));

    // Spawns async task for server.
    tokio::spawn(async move {
        let server = tonic::transport::Server::builder()
            .accept_http1(true)
            .add_service(tonic_web::enable(vs_tonic))
            .serve("127.0.0.1:3333".parse().unwrap());

        if let Err(e) = server.await {
            eprintln!("error running tonic server: {}", e);
            Err(format!("error running tonic server: {}", e))
        } else {
            Ok(())
        }
    });

    Ok(true)
}

/// Requests the latest block height from the grpc endpoint.
#[uniffi::export(async_runtime = "tokio")]
pub async fn get_block_height() -> Result<u64, AppError> {
    let state = APP_STATE
        .get()
        .ok_or("app state not initialized")
        .expect("retrieving state");

    // Acquire shared read lock on the `ViewServer`.
    let view_server = state
        .state
        .read()
        .await
        .view_server
        .as_ref()
        .ok_or_else(|| AppError::ViewServer("no view server".to_string()))?
        .clone();

    // `ViewServer` initializes grpc client and sends a grpc request to the tendermint
    // proxy service.
    match view_server.latest_known_block_height().await {
        Ok(height) => Ok(height.0),
        Err(e) => Err(AppError::ViewServer(e.to_string())),
    }
}

/// Retrieves a transparent address from the `ViewServiceClient`.
///
/// Tricky. This is a sync function that creates a tokio runtime
/// to block on the asynchronous `transparent_address` call. Unfortunately,
/// it can't be implemented as an async function because it's called in contexts
/// where the required lifetimes for the client reference cannot be guaranteed
/// to be `static`, which is necessary for async functions.
///
/// This same logic applies to all `ViewServer` methods.
pub fn transparent_address_inner(
    client: &mut ViewServiceClient<BoxGrpcService>,
) -> Result<TransparentAddressResponse, AppError> {
    let rt = tokio::runtime::Runtime::new()
        .map_err(|e| AppError::General(format!("failed to create runtime: {e}")))?;

    let fut = client.transparent_address(TransparentAddressRequest {});
    let response = rt
        .block_on(fut)
        .map_err(|status| AppError::ViewServer(status.to_string()))?
        .into_inner();

    Ok(response)
}

#[uniffi::export(async_runtime = "tokio")]
pub async fn transparent_address() -> Result<Vec<u8>, AppError> {
    let state = APP_STATE
        .get()
        .ok_or_else(|| AppError::General("app state not initialized".to_string()))?;

    // Acquire shared read lock on the `ViewServerClient`.
    let client_arc = state
        .state
        .read()
        .await
        .view_service_client
        .as_ref()
        .ok_or_else(|| AppError::ViewServer("no view server client available".to_string()))?
        .clone();

    // Trick: `spawn_blocking` executes synchronous code (including blocking I/O) on a separate thread pool,
    // preventing blocking of the main tokio runtime
    let result = tokio::task::spawn_blocking(move || {
        let mut guard = client_arc.blocking_lock();

        match transparent_address_inner(&mut guard) {
            Ok(resp) => Ok(resp),
            Err(e) => Err(e),
        }
    })
    .await
    .map_err(|join_err| AppError::General(format!("spawn_blocking error: {join_err}")))??;

    let address = result
        .address
        .ok_or_else(|| AppError::ViewServer("address not found in response".to_string()))?;

    Ok(address.inner)
}
