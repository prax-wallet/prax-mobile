use crate::AppError;
use penumbra_proof_params::{OUTPUT_PROOF_PROVING_KEY, SPEND_PROOF_PROVING_KEY};

/// Load proving keys from a local file.
#[uniffi::export]
pub fn load_local_proving_key(key_type: &str, file_path: &str) -> Result<(), AppError> {
    let path = std::path::Path::new(file_path);

    let key_data = std::fs::read(path)
        .map_err(|e| AppError::General(format!("failed to read file {}: {}", file_path, e)))?;

    load_proving_key(&key_data, key_type)
}

/// Loads the proving key as a collection of bytes, and to sets the keys in memory
/// dynamicaly at runtime. Failure to bundle the proving keys in the IOS device
/// storage or call the load function will fail to generate a proof.
pub fn load_proving_key(key: &[u8], key_type: &str) -> Result<(), AppError> {
    // Map key type with proving keys.
    let proving_key_map = match key_type {
        "spend" => &SPEND_PROOF_PROVING_KEY,
        "output" => &OUTPUT_PROOF_PROVING_KEY,
        _ => return Err(AppError::General(format!("failed to load proving keys"))),
    };

    // Load proving key.
    proving_key_map
        .try_load_unchecked(key)
        .expect("failed to load proving keys");

    Ok(())
}
