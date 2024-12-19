import { DripsyProvider } from 'dripsy';
import dripsyTheme from '../utils/dripsyTheme';
import type { Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
  decorators: [
    Story => (
      <DripsyProvider theme={dripsyTheme}>
        <Story />
      </DripsyProvider>
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
