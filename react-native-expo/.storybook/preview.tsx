import { DripsyProvider } from 'dripsy';
import dripsyTheme from '../utils/dripsyTheme';
import PraxI18nProvider from '../components/PraxI18nProvider';
import type { Preview } from '@storybook/react';
import React from 'react';
import ReduxProvider from '../components/ReduxProvider';
/**
 * Ideally, we'd use `<FontProvider />` in the root decorator to provide fonts
 * to Storybook. But that caused weird import issues. So for now, we'll just add
 * an `@font-face` CSS file to make our fonts work.
 */
import './fonts.css';

const preview: Preview = {
  decorators: [
    Story => (
      <ReduxProvider>
        <PraxI18nProvider>
          <DripsyProvider theme={dripsyTheme}>
            <Story />
          </DripsyProvider>
        </PraxI18nProvider>
      </ReduxProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
