import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-webpack5-compiler-babel',
  ],

  framework: '@storybook/react-webpack5',

  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true,
  },

  staticDirs: ['../public'],

  // Add support for importing i18n from ui-theme plugin (used in preview.tsx)
  webpackFinal: async (config) => {
    config.resolve?.extensions?.push('.ts', '.tsx');
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            reportFiles: ['../../plugins/ui-theme/**/*.{ts,tsx}'],
          },
        },
      ],
    });

    return config;
  },
};

export default config;
