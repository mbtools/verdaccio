import { describe, expect, test } from 'vitest';

import { initializeServer } from './_helper';

describe('plugin failure', () => {
  test('should fail if auth plugin fails', async () => {
    await expect(initializeServer('plugin-auth.yaml')).rejects.toThrow();
  });

  test('should fail if middleware plugin fails', async () => {
    await expect(initializeServer('plugin-middleware.yaml')).rejects.toThrow();
  });

  test('should fail if store plugin fails', async () => {
    await expect(initializeServer('plugin-store.yaml')).rejects.toThrow();
  });
});
