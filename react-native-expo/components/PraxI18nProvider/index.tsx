import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { messages } from '@/locales/en/messages';
import { ReactNode } from 'react';

i18n.loadAndActivate({ locale: 'en', messages });

export interface PraxI18nProviderProps {
  children: ReactNode;
}

export default function PraxI18nProvider({ children }: PraxI18nProviderProps) {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
