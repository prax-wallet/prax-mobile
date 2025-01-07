#![recursion_limit = "256"]

pub mod custody;
pub mod keys;
pub mod structs;
pub mod view;

pub use keys::*;
pub use structs::*;
pub use view::*;

use anyhow::Result;
use camino::Utf8PathBuf;
use once_cell::sync::OnceCell;
use penumbra_custody::soft_kms::SoftKms;
use penumbra_keys::test_keys;
use penumbra_proto::box_grpc_svc::{self};
use penumbra_proto::custody::v1::custody_service_client::CustodyServiceClient;
use penumbra_proto::custody::v1::custody_service_server::CustodyServiceServer;
use penumbra_proto::view::v1::view_service_client::ViewServiceClient;
use penumbra_proto::view::v1::view_service_server::ViewServiceServer;
use penumbra_view::ViewServer;
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::sync::RwLock;

uniffi::setup_scaffolding!();

/// Global state.
static APP_STATE: OnceCell<AppStateContainer> = OnceCell::new();

/// RPC endpoint.
const ENDPOINT: &str = "https://testnet.plinfra.net";

/// Initializes the application state inside the `AppState`.
fn init_app_state() -> RwLock<AppState> {
    RwLock::new(AppState {
        view_server: None,
        view_service_client: None,
        custody_server: None,
        custody_service_client: None,
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

/// Initializes the app state and view and custody services.
#[uniffi::export(async_runtime = "tokio")]
pub async fn start_server(db_path: &str) -> Result<bool, AppError> {
    let state = APP_STATE
        .get()
        .ok_or("app state not initialized")
        .expect("starting server");

    let utf8_path = Utf8PathBuf::from(db_path);

    // Build view and custody services.
    let view_server = match ViewServer::load_or_initialize(
        Some(&utf8_path),
        None::<&str>,
        &penumbra_keys::test_keys::FULL_VIEWING_KEY,
        ENDPOINT.parse().unwrap(),
    )
    .await
    {
        Ok(vs) => vs,
        Err(e) => return Err(AppError::ViewServer(e.to_string())),
    };
    let vs_tonic = ViewServiceServer::from_arc(view_server.clone().into());
    let custody_server = CustodyServiceServer::new(SoftKms::new(
        penumbra_keys::test_keys::SPEND_KEY.clone().into(),
    ));

    // Build view and custody clients.
    let vsc = ViewServiceClient::new(box_grpc_svc::local(vs_tonic.clone()));
    let csc = CustodyServiceClient::new(box_grpc_svc::local(custody_server.clone()));

    // Acquire exclusive write lock and save application state.
    let mut state = state.state.write().await;
    state.spend_key = Some(test_keys::SPEND_KEY.clone());
    state.full_viewing_key = Some(test_keys::FULL_VIEWING_KEY.clone());
    state.view_server = Some(Arc::new(view_server.clone()));
    state.view_service_client = Some(Arc::new(Mutex::new(vsc.into())));
    state.custody_server = Some(Arc::new(custody_server.clone()));
    state.custody_service_client = Some(Arc::new(Mutex::new(csc.into())));

    // Spawns async task for starting the tonic server.
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
