use crate::{structs::*, APP_STATE, ENDPOINT};
use anyhow::Result;
use penumbra_keys::test_keys;
use penumbra_proto::box_grpc_svc::{self, BoxGrpcService};
use penumbra_proto::view::v1::view_service_client::ViewServiceClient;
use penumbra_proto::view::v1::view_service_server::ViewServiceServer;
use penumbra_proto::view::v1::{TransparentAddressRequest, TransparentAddressResponse};
use penumbra_view::ViewServer;
use std::sync::Arc;
use tokio::sync::Mutex;

/// Generic async function that encapsulates common view server operations.
pub async fn handle_view_server_call() -> Result<Arc<ViewServer>, AppError> {
    let state = APP_STATE
        .get()
        .ok_or_else(|| AppError::General("app state not initialized".to_string()))?;

    // Acquire shared read lock on the `ViewServer`.
    let view_server = state
        .state
        .read()
        .await
        .view_server
        .as_ref()
        .ok_or_else(|| AppError::ViewServer("no view server".to_string()))?
        .clone();

    Ok(view_server)
}

/// Generic async function that encapsulates common view client operations.
///
/// Tricky. This is a sync function that creates a tokio runtime
/// to block on the asynchronous `transparent_address` call. Unfortunately,
/// it can't be implemented as an async function because it's called in contexts
/// where the required lifetimes for the client reference cannot be guaranteed
/// to be `static`, which is necessary for async functions.
///
/// This same logic applies to all `View Client` methods.
pub async fn handle_view_client_call<F, T>(f: F) -> Result<T, AppError>
where
    F: FnOnce(&mut ViewServiceClient<BoxGrpcService>) -> Result<T, AppError> + Send + 'static,
    T: Send + 'static,
{
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
    // preventing blocking of the main tokio runtime.
    tokio::task::spawn_blocking(move || {
        let mut guard = client_arc.blocking_lock();
        f(&mut guard)
    })
    .await
    .map_err(|e| AppError::General(format!("spawn_blocking error: {e}")))?
}

/// Requests the latest block height from the grpc endpoint.
#[uniffi::export(async_runtime = "tokio")]
pub async fn get_block_height() -> Result<u64, AppError> {
    // `ViewServer` initializes grpc client and sends a grpc request to the tendermint
    // proxy service.

    let view_server_handle = handle_view_server_call().await?;

    match view_server_handle.latest_known_block_height().await {
        Ok(height) => Ok(height.0),
        Err(e) => Err(AppError::ViewServer(e.to_string())),
    }
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

/// Retrieves a transparent address from the `ViewServiceClient`.
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
    let result = handle_view_client_call(transparent_address_inner).await?;

    let address = result
        .address
        .ok_or_else(|| AppError::ViewServer("address not found in response".to_string()))?;

    Ok(address.inner)
}

#[cfg(test)]
mod tests {
    use crate::{create_app_state_container, get_block_height, start_server, transparent_address};

    #[tokio::test]
    async fn test_view_server_initialization_and_height() {
        create_app_state_container()
            .await
            .expect("failed to create app state container");

        start_server().await.expect("failed to start server");

        let block_height = get_block_height().await;
        match block_height {
            Ok(_block_height) => {}
            Err(e) => {
                panic!("failed to retrieve block height: {:?}", e);
            }
        }

        let transparent_address = transparent_address().await;
        match transparent_address {
            Ok(transparent_address) => {
                println!("transparent address: {:?}", transparent_address);
            }
            Err(e) => {
                panic!("failed to retrieve transparent address: {:?}", e);
            }
        }
    }
}
