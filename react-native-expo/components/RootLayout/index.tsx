import AppInitializationContext from '@/contexts/AppInitializationContext';
import { Stack } from 'expo-router';
import useInitializeApp from './useInitializeApp';

export default function RootLayout() {
  const appInitialization = useInitializeApp();

  return (
    <AppInitializationContext.Provider value={appInitialization}>
      <Stack />
    </AppInitializationContext.Provider>
  );
}
