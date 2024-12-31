import AppInitializationContext from '@/contexts/AppInitializationContext';
import { DripsyProvider } from 'dripsy';
import dripsyTheme from '@/utils/dripsyTheme';
import FontProvider from './FontProvider';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { messages } from '@/locales/en/messages';
import ReduxProvider from '../ReduxProvider';
import { Stack } from 'expo-router';
import useInitializeApp from './useInitializeApp';

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
          <DripsyProvider theme={dripsyTheme}>
            <AppInitializationContext.Provider value={appInitialization}>
              <Stack screenOptions={STACK_SCREEN_OPTIONS}>
                <Stack.Screen name='(tabs)' />
              </Stack>
            </AppInitializationContext.Provider>
          </DripsyProvider>
        </FontProvider>
      </ReduxProvider>
    </I18nProvider>
  );
}
