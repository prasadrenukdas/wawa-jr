/**
 * React Native CLI configuration and setup.
 *
 * This allows us to hook into the bundle process.
 */
const blacklist = require('metro/src/blacklist');

module.exports = {
  // Use TypeScript with React Native
  getTransformModulePath() {
    return require.resolve('react-native-typescript-transformer')
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },

  // This fixes issues when trying to import some modules such as
  // See: https://github.com/facebook/react-native/issues/17610
  // TODO remove this once the issue is fixed (RN 54?)
  getBlacklistRE() {
    return blacklist([/react-native\/local-cli\/core\/__fixtures__.*/])
  },
}
