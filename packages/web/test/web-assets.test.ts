import supertest from 'supertest';
import { describe, expect, test } from 'vitest';

import { HEADER_TYPE, HTTP_STATUS } from '@verdaccio/core';
import { setup } from '@verdaccio/logger';

import { initializeServer } from './helper';

setup({});

describe('test web server', () => {
  test('should return file from asset folder', async () => {
    const app = await initializeServer('web-assets.yaml');
    const response = await supertest(app)
      .get('/-/assets/verdaccio.svg')
      .expect(HEADER_TYPE.CONTENT_TYPE, 'image/svg+xml')
      .expect(HTTP_STATUS.OK);
    expect(response.body).toBeInstanceOf(Buffer);
    expect(response.body).toHaveLength(3279);
  });

  test('should return file from assets sub-folders', async () => {
    const app = await initializeServer('web-assets.yaml');
    const response = await supertest(app)
      .get('/-/assets/logos/verdaccio.svg')
      .expect(HEADER_TYPE.CONTENT_TYPE, 'image/svg+xml')
      .expect(HTTP_STATUS.OK);
    expect(response.body).toBeInstanceOf(Buffer);
    expect(response.body).toHaveLength(3279);
  });

  test('should return 404 for invalid asset folder', async () => {
    const app = await initializeServer('web-assets.yaml');
    await supertest(app).get('/-/assets/invalid.svg').expect(HTTP_STATUS.NOT_FOUND);
  });

  test('should reject path traversal using dot-dot segment to escape base directory', async () => {
    const app = await initializeServer('web-assets.yaml');
    await supertest(app).get('/-/assets/../secret-file.yaml').expect(HTTP_STATUS.UNAUTHORIZED);
  });
  test('should reject URL-encoded dot-dot traversal', async () => {
    const app = await initializeServer('web-assets.yaml');
    await supertest(app).get('/-/assets/%2e%2e%2fweb-assets.yaml').expect(HTTP_STATUS.NOT_FOUND);
  });
  test('should resolve current-directory pattern', async () => {
    const app = await initializeServer('web-assets.yaml');
    await supertest(app).get('/-/assets/./verdaccio.svg').expect(HTTP_STATUS.OK);
  });
  test('should resolve subdirectory dot-dot traversal', async () => {
    const app = await initializeServer('web-assets.yaml');
    await supertest(app).get('/-/assets/test/../verdaccio.svg').expect(HTTP_STATUS.OK);
  });
});
