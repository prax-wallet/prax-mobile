use crate::{structs::*, APP_STATE};
use anyhow::Result;
use penumbra_custody::soft_kms::SoftKms;
use penumbra_proto::box_grpc_svc::BoxGrpcService;
use penumbra_proto::custody::v1::custody_service_client::CustodyServiceClient;
use penumbra_proto::custody::v1::custody_service_server::CustodyServiceServer;
use std::sync::Arc;

/// Generic async function that encapsulates common custody server operations.
pub async fn handle_custody_server_call() -> Result<Arc<CustodyServiceServer<SoftKms>>, AppError> {
    let state = APP_STATE
        .get()
        .ok_or_else(|| AppError::General("app state not initialized".to_string()))?;

    // Acquire shared read lock on the `ViewServer`.
    let custody_server = state
        .state
        .read()
        .await
        .custody_server
        .as_ref()
        .ok_or_else(|| AppError::ViewServer("no custody server".to_string()))?
        .clone();

    Ok(custody_server)
}

/// Generic async function that encapsulates common custody client operations.
pub async fn handle_custody_client_call<F, T>(f: F) -> Result<T, AppError>
where
    F: FnOnce(&mut CustodyServiceClient<BoxGrpcService>) -> Result<T, AppError> + Send + 'static,
    T: Send + 'static,
{
    let state = APP_STATE
        .get()
        .ok_or_else(|| AppError::General("app state not initialized".to_string()))?;

    // Acquire shared read lock on the `CustodyServerClient`.
    let client_arc = state
        .state
        .read()
        .await
        .custody_service_client
        .as_ref()
        .ok_or_else(|| AppError::ViewServer("no custody server client available".to_string()))?
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
