use crate::AppError;
use std::fs::File;
use std::io::Read;
use std::path::Path;

use penumbra_proof_params::{OUTPUT_PROOF_PROVING_KEY, SPEND_PROOF_PROVING_KEY};

#[uniffi::export]
pub fn load_local_proving_key(key_type: &str, storage_path: &String) -> Result<(), AppError> {
    println!("storage_path: {:?}", storage_path);

    let filename = match key_type {
        "spend" => storage_path,
        "output" => storage_path,
        _ => {
            return Err(AppError::General(format!(
                "Invalid proving key type: {}",
                key_type
            )))
        }
    };

    let path = Path::new(filename);
    let mut file =
        File::open(path).map_err(|e| AppError::General(format!("Failed to open file: {}", e)))?;

    let mut proving_key_bytes = Vec::new();
    file.read_to_end(&mut proving_key_bytes)
        .map_err(|e| AppError::General(format!("Failed to read file: {}", e)))?;

    load_proving_key(&proving_key_bytes, key_type)
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
