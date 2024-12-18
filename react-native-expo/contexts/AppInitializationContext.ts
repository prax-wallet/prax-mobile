import { createContext } from 'react';

const AppInitializationContext = createContext<{ isLoading: boolean; error: string | null }>({
  isLoading: false,
  error: null,
});
export default AppInitializationContext;
