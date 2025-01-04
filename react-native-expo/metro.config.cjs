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
