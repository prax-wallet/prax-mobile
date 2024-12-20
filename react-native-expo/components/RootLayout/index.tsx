import AppInitializationContext from '@/contexts/AppInitializationContext';
import { DripsyProvider } from 'dripsy';
import dripsyTheme from '@/utils/dripsyTheme';
import { Stack } from 'expo-router';
import useInitializeApp from './useInitializeApp';
import FontProvider from './FontProvider';
import NavBar from '../NavBar';

const STACK_SCREEN_OPTIONS = {
  contentStyle: { backgroundColor: 'white' },
  header: () => <NavBar />,
};

export default function RootLayout() {
  const appInitialization = useInitializeApp();

  return (
    <FontProvider>
      <DripsyProvider theme={dripsyTheme}>
        <AppInitializationContext.Provider value={appInitialization}>
          <Stack screenOptions={STACK_SCREEN_OPTIONS} />
        </AppInitializationContext.Provider>
      </DripsyProvider>
    </FontProvider>
  );
}
