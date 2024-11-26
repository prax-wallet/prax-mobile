uniffi::setup_scaffolding!();
 
#[uniffi::export]
fn invoke_rust() -> String {
    "Hello from Rust!".to_string()
}