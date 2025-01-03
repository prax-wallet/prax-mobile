use crate::{structs::*, APP_STATE};
use anyhow::Result;
use penumbra_asset::{Value, STAKING_TOKEN_ASSET_ID};
use penumbra_keys::test_keys;
use penumbra_proto::box_grpc_svc::BoxGrpcService;
use penumbra_proto::view::v1::transaction_planner_request as tpr;
use penumbra_proto::view::v1::view_service_client::ViewServiceClient;
use penumbra_proto::view::v1::{
    TransactionPlannerRequest, TransactionPlannerResponse, TransparentAddressRequest,
    TransparentAddressResponse,
};
use penumbra_view::ViewServer;
use std::ops::Deref;
use std::sync::Arc;

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
    let view_server_handle = handle_view_server_call().await?;

    // `ViewServer` initializes grpc client and sends a grpc request to the tendermint
    // proxy service.
    match view_server_handle.latest_known_block_height().await {
        Ok(height) => Ok(height.0),
        Err(e) => Err(AppError::ViewServer(e.to_string())),
    }
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

pub fn transaction_planner_inner(
    client: &mut ViewServiceClient<BoxGrpcService>,
) -> Result<TransactionPlannerResponse, AppError> {
    let rt = tokio::runtime::Runtime::new()
        .map_err(|e| AppError::General(format!("failed to create runtime: {e}")))?;

    let fut = client.transaction_planner(TransactionPlannerRequest {
        outputs: vec![tpr::Output {
            address: Some(test_keys::ADDRESS_1.deref().clone().into()),
            value: Some(
                Value {
                    amount: 1_000_000u64.into(),
                    asset_id: *STAKING_TOKEN_ASSET_ID,
                }
                .into(),
            ),
        }],
        spends: vec![tpr::Spend {
            address: Some(test_keys::ADDRESS_0.deref().clone().into()),
            value: Some(
                Value {
                    amount: 2_000_000u64.into(),
                    asset_id: *STAKING_TOKEN_ASSET_ID,
                }
                .into(),
            ),
        }],
        ..Default::default()
    });

    let response = rt
        .block_on(fut)
        .map_err(|status| AppError::ViewServer(status.to_string()))?
        .into_inner();

    Ok(response)
}

#[uniffi::export(async_runtime = "tokio")]
pub async fn transaction_planner() -> Result<(), AppError> {
    let result: TransactionPlannerResponse = handle_view_client_call(transaction_planner_inner).await?;

    todo!()
}

#[cfg(test)]
mod tests {
    use crate::{
        create_app_state_container, get_block_height, start_server, sync, transaction_planner,
        transparent_address,
    };

    #[tokio::test]
    async fn test_view_server_initialization_and_height() {
        create_app_state_container()
            .await
            .expect("failed to create app state container");

        start_server().await.expect("failed to start server");

        // Sync 10k block from chain
        let _ = sync().await;

        let block_height = get_block_height().await;
        match block_height {
            Ok(_block_height) => {
                println!("block height: {:?}", block_height);
            }
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

        let transaction_planner = transaction_planner().await;
        match transaction_planner {
            Ok(transaction_planner) => {
                println!("transaction planner: {:?}", transaction_planner);
            }
            Err(e) => {
                panic!("failed to retrieve transaction planner: {:?}", e);
            }
        }
    }
}
