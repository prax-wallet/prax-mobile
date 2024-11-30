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
