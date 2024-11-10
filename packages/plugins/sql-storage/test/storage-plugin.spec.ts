import { join } from 'path';
import { describe, expect, test } from 'vitest';

import { Config, parseConfigFile } from '@verdaccio/config';
import { logger, setup } from '@verdaccio/logger';

import StoragePlugin from '../src/index';

setup({});

const config = new Config(parseConfigFile(join(__dirname, 'config.yaml')));

const options = { config, logger };

describe('plugin unit test .', () => {
  describe('StoragePlugin', () => {
    test('should create an StoragePlugin instance', () => {
      const storage = new StoragePlugin({}, options);

      expect(storage).toBeDefined();
    });

    test('should add a package', () => {
      const storage = new StoragePlugin({}, options);

      return new Promise((done) => {
        storage.add('test').then(() => {
          storage.get().then((data) => {
            expect(data).toHaveLength(1);
            done(true);
          });
        });
      });
    });

    test('should remove a package', () => {
      const pkgName = 'test';
      const storage = new StoragePlugin({}, options);

      return new Promise((done) => {
        storage.add(pkgName).then(() => {
          storage.remove(pkgName).then(() => {
            storage.get().then((data) => {
              expect(data).toHaveLength(0);
              done(true);
            });
          });
        });
      });
    });
  });
});
