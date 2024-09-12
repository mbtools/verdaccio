import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    environmentOptions: {
      url: 'http://localhost:9000/',
    },
    exclude: ['**/node_modules/**', './build/**', './storybook-static/**'],
    setupFiles: ['./test/vitest.setup.ts'],
    globals: true,
    watch: false,
    passWithNoTests: true,
    coverage: {
      reporter: ['text', 'html'],
      thresholds: {
        global: {
          branches: 70,
          functions: 75,
          lines: 80,
          statements: 81,
        },
      },
    },
  },
});
