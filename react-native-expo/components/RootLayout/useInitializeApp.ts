import { createAppStateContainer, startServer } from '@/modules/penumbra-sdk-module';
import { useEffect, useState } from 'react';

export default function useInitializeApp() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await createAppStateContainer();
        await startServer();
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
