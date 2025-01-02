import AppInitializationContext from '@/contexts/AppInitializationContext';
import FontProvider from './FontProvider';
import PraxDripsyProvider from '../PraxDripsyProvider';
import PraxI18nProvider from '../PraxI18nProvider';
import ReduxProvider from '../ReduxProvider';
import { Stack } from 'expo-router';
import useInitializeApp from './useInitializeApp';
import BackButtonHeader from '../BackButtonHeader';

const STACK_SCREEN_OPTIONS = {
  contentStyle: { backgroundColor: 'white' },
  header: () => null,
};

export default function RootLayout() {
  const appInitialization = useInitializeApp();

  return (
    <PraxI18nProvider>
      <ReduxProvider>
        <FontProvider>
          <PraxDripsyProvider>
            <AppInitializationContext.Provider value={appInitialization}>
              <Stack screenOptions={STACK_SCREEN_OPTIONS}>
                <Stack.Screen name='(tabs)' />

                <Stack.Screen name='profile' options={{ header: () => <BackButtonHeader /> }} />
                <Stack.Screen
                  name='profile/defaultPaymentToken'
                  options={{ header: () => <BackButtonHeader /> }}
                />

                <Stack.Screen
                  name='transactions'
                  options={{ header: () => <BackButtonHeader /> }}
                />
              </Stack>
            </AppInitializationContext.Provider>
          </PraxDripsyProvider>
        </FontProvider>
      </ReduxProvider>
    </PraxI18nProvider>
  );
}
