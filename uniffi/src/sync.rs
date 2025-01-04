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

    // Pull out the first message to initialize the progress bar
    let initial_status = status_stream
        .next()
        .await
        .transpose()?
        .ok_or_else(|| anyhow::anyhow!("view service did not report sync status"))?;

    eprintln!(
        "Scanning blocks from last sync height {} to latest height {}",
        initial_status.full_sync_height, initial_status.latest_known_block_height,
    );

    use indicatif::{ProgressBar, ProgressStyle};

    // Progress bar starts with the known range
    let total_blocks = initial_status.latest_known_block_height - initial_status.full_sync_height;
    let progress_bar = ProgressBar::new(total_blocks as u64).with_style(
        ProgressStyle::default_bar()
            .template("[{elapsed}] {bar:50.cyan/blue} {pos:>7}/{len:7} {per_sec} ETA: {eta}"),
    );

    progress_bar.set_position(0);

    let mut last_synced_height = initial_status.full_sync_height;

    while let Some(status) = status_stream.next().await.transpose()? {
        // Update progress bar as new blocks are synced
        let synced_blocks = status.full_sync_height - last_synced_height;
        progress_bar.inc(synced_blocks as u64);

        last_synced_height = status.full_sync_height;

        // Dynamically adjust progress bar length if more blocks are discovered
        if status.latest_known_block_height > last_synced_height {
            let new_total_blocks =
                status.latest_known_block_height - initial_status.full_sync_height;
            progress_bar.set_length(new_total_blocks as u64);
        }
    }

    progress_bar.finish();
    Ok(())
}
