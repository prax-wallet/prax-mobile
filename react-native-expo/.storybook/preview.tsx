import { DripsyProvider } from 'dripsy';
import dripsyTheme from '../utils/dripsyTheme';
import PraxI18nProvider from '../components/PraxI18nProvider';
import type { Preview } from '@storybook/react';
import React from 'react';
/**
 * Ideally, we'd use `<FontProvider />` in the root decorator to provide fonts
 * to Storybook. But that caused weird import issues. So for now, we'll just add
 * an `@font-face` CSS file to make our fonts work.
 */
import './fonts.css';

const preview: Preview = {
  decorators: [
    Story => (
      <PraxI18nProvider>
        <DripsyProvider theme={dripsyTheme}>
          <Story />
        </DripsyProvider>
      </PraxI18nProvider>
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
