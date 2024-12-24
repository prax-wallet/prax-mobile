import AppInitializationContext from '@/contexts/AppInitializationContext';
import { DripsyProvider } from 'dripsy';
import dripsyTheme from '@/utils/dripsyTheme';
import { Stack } from 'expo-router';
import useInitializeApp from './useInitializeApp';
import FontProvider from './FontProvider';
import ReduxProvider from '../ReduxProvider';

const STACK_SCREEN_OPTIONS = {
  contentStyle: { backgroundColor: 'white' },
  header: () => null,
};

export default function RootLayout() {
  const appInitialization = useInitializeApp();

  return (
    <ReduxProvider>
      <FontProvider>
        <DripsyProvider theme={dripsyTheme}>
          <AppInitializationContext.Provider value={appInitialization}>
            <Stack screenOptions={STACK_SCREEN_OPTIONS}>
              <Stack.Screen name='(tabs)' />
            </Stack>
          </AppInitializationContext.Provider>
        </DripsyProvider>
      </FontProvider>
    </ReduxProvider>
  );
}
