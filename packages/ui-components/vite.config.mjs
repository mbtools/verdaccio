import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { createLibConfig } from '../../vite.lib.config.mjs';
import { svgInlinePlugin, linkEntryCssPlugin } from './tools/vite-plugins.mjs';

const baseConfig = createLibConfig(import.meta.dirname,
  { bundleDeps: ['react/jsx-runtime', 'react/jsx-dev-runtime'] }
);

// TODO: remove this after react-i18next is updated to v17
// https://www.locize.com/docs/general-questions/why-was-there-a-support-notice-for-i18next/
globalThis.__i18next_supportNoticeShown = true;

export default defineConfig({
  ...baseConfig,
  plugins: [
    react(),
    svgInlinePlugin(),
    linkEntryCssPlugin(),
    ...baseConfig.plugins,
  ],
  ...baseConfig,
  plugins: [
    react(),
    svgInlinePlugin(),
    linkEntryCssPlugin(),
    ...baseConfig.plugins,
  ],
});
