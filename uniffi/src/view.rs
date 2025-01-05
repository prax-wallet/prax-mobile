use crate::{structs::*, APP_STATE};
use anyhow::Result;
use futures::StreamExt;
use penumbra_asset::{Value, STAKING_TOKEN_ASSET_ID};
use penumbra_keys::test_keys;
use penumbra_proto::box_grpc_svc::BoxGrpcService;
use penumbra_proto::core::transaction::v1::{
    AuthorizationData as AuthorizationDataProto, TransactionPlan as TransactionPlanProto,
};
use penumbra_proto::view::v1::view_service_client::ViewServiceClient;
use penumbra_proto::view::v1::witness_and_build_response::Status;
use penumbra_proto::view::v1::{
    transaction_planner_request as tpr, WitnessAndBuildRequest, WitnessAndBuildResponse,
};
use penumbra_proto::view::v1::{
    TransactionPlannerRequest, TransactionPlannerResponse, TransparentAddressRequest,
    TransparentAddressResponse,
};
use penumbra_proto::{DomainType, Message};
use penumbra_transaction::{Transaction, TransactionPlan};
use penumbra_view::{ViewClient, ViewServer};
use std::ops::Deref;
use std::sync::Arc;
use tonic::Streaming;

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

pub fn sync_inner(client: &mut ViewServiceClient<BoxGrpcService>) -> Result<(), AppError> {
    let rt = tokio::runtime::Runtime::new()
        .map_err(|e| AppError::General(format!("failed to create runtime: {e}")))?;

    rt.block_on(async {
        let mut status_stream = ViewClient::status_stream(client).await.expect("sync");

        let initial_status = status_stream
            .next()
            .await
            .transpose()
            .expect("sync")
            .ok_or_else(|| anyhow::anyhow!("view service did not report sync status"))
            .expect("sync");

        eprintln!(
            "Scanning blocks from last sync height {} to latest height {}",
            initial_status.full_sync_height, initial_status.latest_known_block_height,
        );

        let max_blocks_to_sync = 10_000;
        let blocks_to_sync = std::cmp::min(
            initial_status.latest_known_block_height - initial_status.full_sync_height,
            max_blocks_to_sync,
        );

        use indicatif::{ProgressBar, ProgressDrawTarget, ProgressStyle};
        let progress_bar =
            ProgressBar::with_draw_target(blocks_to_sync, ProgressDrawTarget::stdout()).with_style(
                ProgressStyle::default_bar().template(
                    "[{elapsed}] {bar:50.cyan/blue} {pos:>7}/{len:7} {per_sec} ETA: {eta}",
                ),
            );
        progress_bar.set_position(0);

        while let Some(status) = status_stream.next().await.transpose().expect("sync") {
            if status.full_sync_height - initial_status.full_sync_height >= blocks_to_sync {
                break;
            }
            progress_bar.set_position(status.full_sync_height - initial_status.full_sync_height);
        }
        progress_bar.finish();

        Ok(())
    })
}

/// Syncing mechaism.
#[uniffi::export(async_runtime = "tokio")]
pub async fn sync() -> Result<(), AppError> {
    handle_view_client_call(sync_inner).await
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

    // Temporary: dummy transaction planner request.
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
pub async fn transaction_planner() -> Result<Vec<u8>, AppError> {
    let result: TransactionPlannerResponse =
        handle_view_client_call(transaction_planner_inner).await?;

    let transaction_plan: TransactionPlan =
        result.plan.unwrap().try_into().expect("transaction plan");

    Ok(transaction_plan.encode_to_vec())
}

pub fn witness_and_build_inner(
    plan: TransactionPlanProto,
    auth_data: AuthorizationDataProto,
    client: &mut ViewServiceClient<BoxGrpcService>,
) -> Result<Streaming<WitnessAndBuildResponse>, AppError> {
    let rt = tokio::runtime::Runtime::new()
        .map_err(|e| AppError::General(format!("failed to create runtime: {e}")))?;

    let fut = client.witness_and_build(WitnessAndBuildRequest {
        transaction_plan: Some(plan),
        authorization_data: Some(auth_data),
    });

    let response = rt
        .block_on(fut)
        .map_err(|status| AppError::ViewServer(status.to_string()))?
        .into_inner();

    Ok(response)
}

#[uniffi::export(async_runtime = "tokio")]
pub async fn witness_and_build(
    transaction_plan: &[u8],
    authorization_data: &[u8],
) -> Result<Vec<u8>, AppError> {
    let plan: TransactionPlanProto = TransactionPlanProto::decode(transaction_plan)
        .map_err(|e| AppError::General(format!("failed to decode TransactionPlan: {e}")))?;
    let auth_data: AuthorizationDataProto = AuthorizationDataProto::decode(authorization_data)
        .map_err(|e| AppError::General(format!("failed to decode AuthorizationData: {e}")))?;

    let mut result =
        handle_view_client_call(|client| witness_and_build_inner(plan, auth_data, client)).await?;

    let mut final_response: Option<WitnessAndBuildResponse> = None;

    while let Some(response) = result.next().await {
        match response {
            Ok(witness_and_build_response) => {
                final_response = Some(witness_and_build_response);
            }
            Err(e) => {
                return Err(AppError::General(format!(
                    "Error receiving stream response: {}",
                    e
                )));
            }
        }
    }

    // Extracts transaction from the stream for now.
    let transaction = if let Some(status) = final_response.unwrap().status {
        if let Status::Complete(complete) = status {
            complete.transaction
        } else {
            return Err(AppError::General("stream is not complete".to_string()));
        }
    } else {
        return Err(AppError::General(
            "no status found in the stream".to_string(),
        ));
    };

    let transaction: Transaction = transaction
        .unwrap()
        .try_into()
        .expect("fully-formed transaction");

    Ok(transaction.encode_to_vec())
}

#[cfg(test)]
mod tests {
    use penumbra_proto::{
        core::transaction::v1::{AuthorizationData, Transaction, TransactionPlan},
        Message,
    };

    use crate::{
        create_app_state_container, custody::authorize, start_server, transaction_planner,
        view::sync, witness_and_build,
    };

    #[tokio::test]
    async fn test_transaction_planner_and_proof_generation() {
        create_app_state_container()
            .await
            .expect("failed to create app state container");

        start_server("").await.expect("failed to start server");

        let _ = sync().await;

        let transaction_planner_result = transaction_planner()
            .await
            .expect("failed to query transaction planner");

        TransactionPlan::decode(&*transaction_planner_result)
            .expect("failed to decode transaction plan");

        let authorize_data_result = authorize(&transaction_planner_result)
            .await
            .expect("failed to query authorization data");

        AuthorizationData::decode(&*authorize_data_result)
            .expect("failed to decode authorization data");

        let witness_and_build_result =
            witness_and_build(&transaction_planner_result, &authorize_data_result)
                .await
                .expect("failed to query witness and build");

        Transaction::decode(&*witness_and_build_result)
            .expect("failed to decode witness and build data");
    }
}
