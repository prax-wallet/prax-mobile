import { loadLocalProvingKey } from '@/modules/penumbra-sdk-module';
import * as FileSystem from 'expo-file-system';

export const keysVersion = 'v0.78.0';
export const baseURL = `https://github.com/penumbra-zone/penumbra/raw/${keysVersion}/crates/crypto/proof-params/src/gen/`;
export const files = [
    'output_pk.bin',
    'spend_pk.bin',
];

export async function fetchProvingKeys(baseURL: string, files: string[], outputDir: string): Promise<void> {
    try {
        await FileSystem.makeDirectoryAsync(outputDir, { intermediates: true });
  
        for (const file of files) {
            const fileURL = `${baseURL}${file}`;
            const destinationPath = `${outputDir}/${file}`;
  
            // Fetch and save the file
            const response = await FileSystem.downloadAsync(fileURL, destinationPath);
        }
    } catch (error) {
        console.error('Error downloading files:', error);
    }
}

export async function loadProvingKeys(): Promise<void> {
    const keysDir = `${FileSystem.documentDirectory}ProvingKeys`;
    
    // Key paths
    const spendKeyPath = `${keysDir}/spend_pk.bin`.replace('file://', '');
    const outputKeyPath = `${keysDir}/output_pk.bin`.replace('file://', '');
    
    console.log("spendKeyPath: ", spendKeyPath)

    // Load the proving keys
    await loadLocalProvingKey("spend", spendKeyPath);
    await loadLocalProvingKey("output", outputKeyPath);
}