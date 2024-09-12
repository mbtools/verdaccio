import { Preview } from '@storybook/react';
import Flags from 'country-flag-icons/react/3x2';
import { initialize, mswLoader } from 'msw-storybook-addon';
import * as React from 'react';
import { Provider } from 'react-redux';

import config from '../../plugins/ui-theme/src/i18n/config';
import {
  AppConfigurationProvider,
  PersistenceSettingProvider,
  StyleBaseline,
  ThemeProvider,
  TranslatorProvider,
  store,
} from '../src';
import { handlers as mswHandlers } from '../test/handlers';

/*
 * Initializes MSW
 * https://github.com/mswjs/msw-storybook-addon#configuring-msw
 */
initialize({}, mswHandlers);

const DEFAULT_LANGUAGE = 'en-US';
const listLanguages = [
  { lng: DEFAULT_LANGUAGE, icon: Flags.US, menuKey: 'lng.english' },
  { lng: 'cs-CZ', icon: Flags.CZ, menuKey: 'lng.czech' },
  { lng: 'pt-BR', icon: Flags.BR, menuKey: 'lng.portuguese' },
  { lng: 'es-ES', icon: Flags.ES, menuKey: 'lng.spanish' },
  { lng: 'de-DE', icon: Flags.DE, menuKey: 'lng.german' },
];

// preview-head file contains the __VERDACCIO_BASENAME_UI_OPTIONS
// required by AppConfigurationProvider
const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <TranslatorProvider onMount={() => ({})} i18n={config} listLanguages={listLanguages}>
          <PersistenceSettingProvider>
            <AppConfigurationProvider>
              <ThemeProvider>
                <StyleBaseline />
                <Story />
              </ThemeProvider>
            </AppConfigurationProvider>
          </PersistenceSettingProvider>
        </TranslatorProvider>
      </Provider>
    ),
  ],
  loaders: [mswLoader],
  parameters: {
    layout: 'padded',
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
