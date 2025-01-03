import { configureStore } from '@reduxjs/toolkit';
import { DripsyProvider } from 'dripsy';
import dripsyTheme from '../utils/dripsyTheme';
import PraxI18nProvider from '../components/PraxI18nProvider';
import rootReducer from '../store/rootReducer';
import type { Preview } from '@storybook/react';
import React from 'react';

/**
 * Ideally, we'd use `<FontProvider />` in the root decorator to provide fonts
 * to Storybook. But that caused weird import issues. So for now, we'll just add
 * an `@font-face` CSS file to make our fonts work.
 */
import './fonts.css';
import { Provider } from 'react-redux';

/**
 * For Storybook, we use a simplified version of the Redux store which doesn't
 * include e.g., `redux-persist`.
 */
const store = configureStore({ reducer: rootReducer });

const preview: Preview = {
  decorators: [
    Story => (
      <PraxI18nProvider>
        <Provider store={store}>
          <DripsyProvider theme={dripsyTheme}>
            <Story />
          </DripsyProvider>
        </Provider>
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
