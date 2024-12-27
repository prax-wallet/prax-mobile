import dripsyTheme from '@/utils/dripsyTheme';
import { DripsyProvider } from 'dripsy';
import { ReactNode } from 'react';

export interface PraxDripsyProviderProps {
  children: ReactNode;
}

export default function PraxDripsyProvider({ children }: PraxDripsyProviderProps) {
  return <DripsyProvider theme={dripsyTheme}>{children}</DripsyProvider>;
}
