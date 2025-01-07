use penumbra_custody::soft_kms::SoftKms;
use penumbra_keys::keys::SpendKey;
use penumbra_keys::FullViewingKey;
use penumbra_proto::box_grpc_svc::BoxGrpcService;
use penumbra_proto::custody::v1::custody_service_client::CustodyServiceClient;
use penumbra_proto::custody::v1::custody_service_server::CustodyServiceServer;
use penumbra_proto::view::v1::view_service_client::ViewServiceClient;
use penumbra_view::ViewServer;
use std::sync::Arc;
use tokio::sync::Mutex;
use tokio::sync::RwLock;

#[derive(uniffi::Object)]
pub struct AppState {
    pub view_server: Option<Arc<ViewServer>>,
    /// Arc<Mutex<_>> is counterintuitive here, but required to get around the stringent
    /// 'static lifetime requirements uniffi enforces. Arc enables shared ownership of
    /// the mutex, but mutex itself ensures a single thread acquires the lock and acquires
    /// the critical section. Arc<Mutex<_>> exceptionally enables sharing the Mutex itself
    /// across thread boundaries, eg. `spawn_blocking` in some view service client methods.
    pub view_service_client: Option<Arc<Mutex<ViewServiceClient<BoxGrpcService>>>>,
    pub custody_server: Option<Arc<CustodyServiceServer<SoftKms>>>,
    pub custody_service_client: Option<Arc<Mutex<CustodyServiceClient<BoxGrpcService>>>>,
    pub spend_key: Option<SpendKey>,
    pub full_viewing_key: Option<FullViewingKey>,
}

/// A wrapper type compatible with Uniffi.
/// Uses `RwLock` to enable safe concurrent access to the `AppState`.
#[derive(uniffi::Object)]
pub struct AppStateContainer {
    pub state: RwLock<AppState>,
}

#[derive(Debug, thiserror::Error, uniffi::Error)]
pub enum AppError {
    #[error("{0}")]
    General(String),
    #[error("View server error: {0}")]
    ViewServer(String),
}
