#![recursion_limit = "256"]

mod view_server;
use anyhow::Result;
use once_cell::sync::OnceCell;
use penumbra_keys::keys::SpendKey;
use penumbra_keys::{test_keys, FullViewingKey};
use penumbra_proto::view::v1::view_service_server::ViewServiceServer;
use penumbra_view::ViewServer;
use std::ops::Deref;
use std::sync::Arc;
use tokio::sync::Mutex;
uniffi::setup_scaffolding!();

// Global state
static APP_STATE: OnceCell<Arc<AppStateContainer>> = OnceCell::new();

const ENDPOINT: &str = "https://testnet.plinfra.net";

#[derive(uniffi::Object)]
struct AppState {
    view_server: Option<Arc<ViewServer>>,
    spend_key: Option<Arc<SpendKey>>,
    full_viewing_key: Option<Arc<FullViewingKey>>,
}

// Wrapper type that uniffi can work with
#[derive(uniffi::Object)]
pub struct AppStateContainer {
    state: Arc<Mutex<AppState>>,
}

#[derive(Debug, thiserror::Error, uniffi::Error)]
pub enum AppError {
    #[error("{0}")]
    General(String),
    #[error("View server error: {0}")]
    ViewServer(String),
}

// Create initialize app state
fn init_app_state() -> Mutex<AppState> {
    Mutex::new(AppState {
        view_server: None,
        spend_key: None,
        full_viewing_key: None,
    })
}

#[uniffi::export]
pub async fn create_app_state_container() -> Result<bool, AppError> {
    let container = Arc::new(AppStateContainer {
        state: Arc::new(init_app_state()),
    });

    APP_STATE
        .set(container)
        .map_err(|_| AppError::General("App state already initialized".to_string()))?;

    Ok(true)
}

#[uniffi::export(async_runtime = "tokio")]
pub async fn start_server() -> Result<bool, AppError> {
    let state = APP_STATE
        .get()
        .ok_or("App state not initialized")
        .expect("starting server");

    let view_server = match ViewServer::load_or_initialize(
        None::<&str>,
        None::<&str>,
        &penumbra_keys::test_keys::FULL_VIEWING_KEY,
        ENDPOINT.parse().unwrap(),
    )
    .await
    {
        Ok(vs) => Arc::new(vs),
        Err(e) => return Err(AppError::ViewServer(e.to_string())),
    };

    // Set dummy keys in state
    let mut state = state.state.lock().await;
    state.spend_key = Some(test_keys::SPEND_KEY.clone().into());
    state.full_viewing_key = Some(test_keys::FULL_VIEWING_KEY.clone().into());
    state.view_server = Some(view_server.clone());

    tokio::spawn(async move {
        let vs_tonic = ViewServiceServer::from_arc(view_server.clone());
        let server = tonic::transport::Server::builder()
            .accept_http1(true)
            .add_service(tonic_web::enable(vs_tonic))
            .serve("127.0.0.1:3333".parse().unwrap());

        if let Err(e) = server.await {
            Err(format!("Error running tonic server: {}", e))
        } else {
            Ok(())
        }
    });

    Ok(true)
}

#[uniffi::export(async_runtime = "tokio")]
pub async fn get_block_height() -> Result<u64, AppError> {
    let state = APP_STATE
        .get()
        .ok_or("App state not initialized")
        .expect("retrieving state");

    let view_server = match &state.state.lock().await.view_server {
        Some(vs) => vs.deref().clone(),
        None => {
            return Err(AppError::ViewServer(
                "acquiring lock on view server".to_string(),
            ));
        }
    };

    let block_height = match view_server.latest_known_block_height().await {
        Ok(height) => {
            println!("Block height: {}", height.0);
            height.0
        }
        Err(e) => {
            return Err(AppError::ViewServer(e.to_string()));
        }
    };

    Ok(block_height)
}
