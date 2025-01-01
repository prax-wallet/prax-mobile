#[cfg(test)]
mod tests {
    use crate::{create_app_state_container, get_block_height, start_server};

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
    }
}
