#![recursion_limit = "256"]

pub mod structs;
pub mod view_server;
use anyhow::Result;
use once_cell::sync::OnceCell;
pub use structs::*;
use tokio::sync::RwLock;
pub use view_server::*;

uniffi::setup_scaffolding!();

/// Global state.
static APP_STATE: OnceCell<AppStateContainer> = OnceCell::new();

/// RPC endpoint.
const ENDPOINT: &str = "https://testnet.plinfra.net";

/// Initializes the application state inside the `AppState`.
fn init_app_state() -> RwLock<AppState> {
    RwLock::new(AppState {
        view_server: None,
        view_service_client: None,
        spend_key: None,
        full_viewing_key: None,
    })
}

/// Top-level initialization method exposed to Uniffi. Initializes an `AppStateContainer`
/// and stores it in the global `APP_STATE`.
#[uniffi::export]
pub async fn create_app_state_container() -> Result<bool, AppError> {
    let container = AppStateContainer {
        state: init_app_state(),
    };

    APP_STATE
        .set(container)
        .map_err(|_| AppError::General("app state already initialized".to_string()))?;

    Ok(true)
}
