import AppInitializationContext from '@/contexts/AppInitializationContext';
import { DripsyProvider } from 'dripsy';
import dripsyTheme from '@/utils/dripsyTheme';
import { Stack } from 'expo-router';
import useInitializeApp from './useInitializeApp';
import FontProvider from './FontProvider';

export default function RootLayout() {
  const appInitialization = useInitializeApp();

  return (
    <FontProvider>
      <DripsyProvider theme={dripsyTheme}>
        <AppInitializationContext.Provider value={appInitialization}>
          <Stack />
        </AppInitializationContext.Provider>
      </DripsyProvider>
    </FontProvider>
  );
}
