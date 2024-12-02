#![recursion_limit = "256"]

mod view_server;
use anyhow::Result;
use async_std::future::{pending, timeout};
use once_cell::sync::OnceCell;
use penumbra_proto::view::v1::view_service_server::ViewServiceServer;
use std::sync::Arc;
use tokio::task;
use tokio::{runtime::Runtime, sync::Mutex, time::Duration};
use warp::Filter;
use penumbra_view::ViewServer;
uniffi::setup_scaffolding!();

// Shared state for the counter
static COUNTER: OnceCell<Arc<Mutex<u64>>> = OnceCell::new();

#[uniffi::export]
fn invoke_rust() -> String {
    "Hello from Rust!".to_string()
}

#[uniffi::export(async_runtime = "tokio")]
pub async fn perform_async_task(input: String) -> String {
    let result = task::spawn(async move {
        tokio::time::sleep(Duration::from_secs(2)).await;
        format!("Processed: {input}")
    })
    .await;

    result.unwrap_or_else(|_| "Task failed".to_string())
}

#[uniffi::export(async_runtime = "tokio")]
pub async fn start_counter() -> bool {
    let counter: &Arc<Mutex<u64>> = COUNTER.get_or_init(|| Arc::new(Mutex::new(0)));
    let counter_clone = counter.clone();

    task::spawn(async move {
        loop {
            {
                let mut value = counter_clone.lock().await;
                *value += 1;
                println!("Counter incremented: {}", *value);
            }
            tokio::time::sleep(Duration::from_secs(2)).await;
        }
    });

    true
}

#[uniffi::export(async_runtime = "tokio")]
pub async fn get_counter() -> u64 {
    let counter = COUNTER.get_or_init(|| Arc::new(Mutex::new(0)));
    let value = counter.lock().await;
    *value
}

#[uniffi::export]
pub async fn say_after(ms: u64, who: String) -> String {
    let never = pending::<()>();
    timeout(std::time::Duration::from_millis(ms), never)
        .await
        .unwrap_err();
    format!("Hello, {who}!")
}

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

#[uniffi::export(async_runtime = "tokio")]
pub async fn start_server() -> Option<u64> {
    tracing::info!("Starting servers...");

    // Start the test view server and handle any errors upfront.
    let vs = match start_test_view_server().await {
        Ok(vs) => vs,
        Err(e) => {
            eprintln!("Error starting view server: {}", e);
            return None;
        }
    };

    // Get the block height before spawning tasks.
    let block_height = match vs.latest_known_block_height().await {
        Ok(height) => {
            println!("Block height: {}", height.0);
            height.0
        }
        Err(e) => {
            eprintln!("Error querying block height: {}", e);
            return None;
        }
    };

    // Spawn the Tonic server in the background.
    tokio::spawn(async move {
        let vs_tonic = ViewServiceServer::new(vs);
        let server = tonic::transport::Server::builder()
            .accept_http1(true)
            .add_service(tonic_web::enable(vs_tonic))
            .serve("127.0.0.1:3333".parse().unwrap());

        if let Err(e) = server.await {
            eprintln!("Error running tonic server: {}", e);
        }
    });

    // Spawn the Warp server in the background.
    tokio::spawn(async {
        let routes = warp::path!("hello" / String).map(|name| format!("Hello, {}!", name));
        warp::serve(routes).run(([127, 0, 0, 1], 3030)).await;
    });

    println!("Servers started successfully");
    Some(block_height)
}

