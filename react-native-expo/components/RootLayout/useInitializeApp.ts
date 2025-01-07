import { createAppStateContainer, startServer } from '@/modules/penumbra-sdk-module';
import { getDatabasePath, prepareDatabase } from '@/storage/sqlite';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { baseURL, fetchProvingKeys, files, loadProvingKeys } from '@/storage/provingKeys';

export default function useInitializeApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize app state
        await createAppStateContainer();

        // Initialize SQLite database
        const dbPath = await getDatabasePath();
        await prepareDatabase(dbPath);
        
        // Fetch and load proving keys
        const outputDir = `${FileSystem.documentDirectory}ProvingKeys`;
        await fetchProvingKeys(baseURL, files, outputDir);
        await loadProvingKeys();

        // Start view and custody services
        await startServer(dbPath);

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize');
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  return { isLoading, error };
}
