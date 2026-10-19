import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  AppConfigurationProvider,
  AuthProvider,
  ErrorBoundary,
  PersistenceSettingProvider,
  StyleBaseline,
  ThemeProvider,
} from '@verdaccio/ui-components';

import App from './App';
import { initializeAnalytics } from './analytics'; // apm

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container missing');
}

const root = createRoot(container);

initializeAnalytics(window.__VERDACCIO_BASENAME_UI_OPTIONS); // apm

const AppContainer = () => (
  <ErrorBoundary>
    <AppConfigurationProvider>
      <ThemeProvider>
        <StyleBaseline />
        <PersistenceSettingProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PersistenceSettingProvider>
      </ThemeProvider>
    </AppConfigurationProvider>
  </ErrorBoundary>
);

root.render(<AppContainer />);
