use anyhow::Result;
use penumbra_view::ViewServer;

const ENDPOINT: &str = "https://testnet.plinfra.net";

pub async fn start_test_view_server() -> Result<ViewServer> {
    ViewServer::load_or_initialize(
        None::<&str>,
        None::<&str>,
        &penumbra_keys::test_keys::FULL_VIEWING_KEY,
        ENDPOINT.parse().unwrap(),
    )
    .await
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_start_test_view_server() {
        let svc = start_test_view_server().await.unwrap();
        let result = svc.latest_known_block_height().await;

        println!(
            "Result of latest_known_block_height: {:?}",
            result.unwrap().0
        );

        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
    }
}
