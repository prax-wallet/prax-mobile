use crate::{structs::*, APP_STATE};
use anyhow::Result;
use futures::StreamExt;
use penumbra_view::ViewClient;

pub async fn sync() -> Result<()> {
    let state = APP_STATE
        .get()
        .ok_or_else(|| AppError::General("app state not initialized".to_string()))?;

    let view_service_client_arc = state
        .state
        .read()
        .await
        .view_service_client
        .as_ref()
        .ok_or_else(|| AppError::ViewServer("no view server client available".to_string()))?
        .clone();

    let mut view_service_client_guard = view_service_client_arc.lock().await;
    let view_service_client = &mut *view_service_client_guard;
    let mut status_stream = ViewClient::status_stream(view_service_client).await?;

    // Pull out the first message from the stream, which has the current state, and use
    // it to set up a progress bar.
    let initial_status = status_stream
        .next()
        .await
        .transpose()?
        .ok_or_else(|| anyhow::anyhow!("view service did not report sync status"))?;

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
    let progress_bar = ProgressBar::with_draw_target(blocks_to_sync, ProgressDrawTarget::stdout())
        .with_style(
            ProgressStyle::default_bar()
                .template("[{elapsed}] {bar:50.cyan/blue} {pos:>7}/{len:7} {per_sec} ETA: {eta}"),
        );
    progress_bar.set_position(0);

    while let Some(status) = status_stream.next().await.transpose()? {
        if status.full_sync_height - initial_status.full_sync_height >= blocks_to_sync {
            break;
        }
        progress_bar.set_position(status.full_sync_height - initial_status.full_sync_height);
    }
    progress_bar.finish();

    Ok(())
}
