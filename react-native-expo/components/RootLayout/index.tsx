import AppInitializationContext from '@/contexts/AppInitializationContext';
import FontProvider from './FontProvider';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { messages } from '@/locales/en/messages';
import ReduxProvider from '../ReduxProvider';
import { Stack } from 'expo-router';
import useInitializeApp from './useInitializeApp';
import PraxDripsyProvider from '../PraxDripsyProvider';

i18n.loadAndActivate({ locale: 'en', messages });

const STACK_SCREEN_OPTIONS = {
  contentStyle: { backgroundColor: 'white' },
  header: () => null,
};

export default function RootLayout() {
  const appInitialization = useInitializeApp();

  return (
    <I18nProvider i18n={i18n}>
      <ReduxProvider>
        <FontProvider>
          <PraxDripsyProvider>
            <AppInitializationContext.Provider value={appInitialization}>
              <Stack screenOptions={STACK_SCREEN_OPTIONS}>
                <Stack.Screen name='(tabs)' />
              </Stack>
            </AppInitializationContext.Provider>
          </PraxDripsyProvider>
        </FontProvider>
      </ReduxProvider>
    </I18nProvider>
  );
}
