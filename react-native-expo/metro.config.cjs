// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

/**
 * @see https://docs.expo.dev/guides/customizing-metro/#aliases
 */
const ALIASES = {
  /**
   * For some reason, although TypeScript and Storybook understand imports from
   * `@penumbra-zone/bech32m/penumbra`, Expo does not, and expects the import to
   * come from inside `dist`. This should be fixed, but in the meantime, this
   * alias patches the issue.
   *
   * @todo: Fix this!
   */
  '@penumbra-zone/bech32m/penumbra': '@penumbra-zone/bech32m/dist/penumbra',
  /**
   * Same issue here
   */
  '@penumbra-zone/bech32m/passet': '@penumbra-zone/bech32m/dist/passet',
  '@penumbra-zone/protobuf/penumbra/view/v1/view_pb':
    '@penumbra-zone/protobuf/dist/gen/penumbra/view/v1/view_pb',
  '@penumbra-zone/protobuf/penumbra/core/component/stake/v1/stake_pb':
    '@penumbra-zone/protobuf/dist/gen/penumbra/core/component/stake/v1/stake_pb',
  '@penumbra-zone/protobuf/penumbra/core/num/v1/num_pb':
    '@penumbra-zone/protobuf/dist/gen/penumbra/core/num/v1/num_pb',
  '@penumbra-zone/getters/metadata': '@penumbra-zone/getters/dist/metadata.js',
  '@penumbra-zone/getters/value-view': '@penumbra-zone/getters/dist/value-view.js',
  '@penumbra-zone/types/value-view': '@penumbra-zone/types/dist/value-view.js',
  '@penumbra-zone/getters/balances-response': '@penumbra-zone/getters/dist/balances-response.js',
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Call the default resolver
  return context.resolveRequest(
    context,
    // Use an alias if one exists.
    ALIASES[moduleName] ?? moduleName,
    platform,
  );
};

module.exports = config;

module.exports = config;
