import path from 'path';
import react from '@vitejs/plugin-react';
import type { StorybookConfig } from '@storybook/react-vite';
import svgr from 'vite-plugin-svgr';

const config: StorybookConfig = {
  stories: ['../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      optimizeDeps: {
        // Required for libraries that include JSX in their `.js` files.
        // @see https://github.com/vitejs/vite/discussions/3448#discussioncomment-5904031
        esbuildOptions: {
          loader: {
            '.js': 'jsx',
          },
        },
      },
      plugins: [
        // Allows us to use JSX without `import React from 'react'`
        react({ jsxRuntime: 'automatic' }),
        // Allows us to `import foo from './foo.svg'` in Storybook Web just like
        // in React Native.
        svgr({ svgrOptions: { exportType: 'default' } }),
      ],
      resolve: {
        alias: {
          // Match the tsconfig.json alias
          '@': path.resolve(__dirname, '../src'),

          // Tells Storybook to use react-native-web anytime there's an import
          // from react-native
          'react-native': 'react-native-web',

          // Use web-friendly versions of specific libraries
          'react-native-svg': 'react-native-svg-web',
        },
      },
    });
  },
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    '@storybook/addon-react-native-web',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
