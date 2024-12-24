import store from '@/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

export interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
