module.exports = function(api) {
  api.cache(true);  // api.cache(true) speeds up the build process by caching the configuration.
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv', // This plugin allows to use environment variables from a .env file in your React Native project.
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
