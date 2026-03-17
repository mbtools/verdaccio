import type { Application } from 'express';
import path from 'node:path';

import { parseConfigFile } from '@verdaccio/config';
import { cryptoUtils, fileUtils } from '@verdaccio/core';
import { setup } from '@verdaccio/logger';

import startServer from '../src';

export const getConf = async (conf: string) => {
  const configPath = path.join(__dirname, 'config', conf);
  const config = parseConfigFile(configPath);
  // generate and create storage folder
  const storage = await fileUtils.createTempFolder('config');
  config.storage = storage;
  if (config.auth?.htpasswd) {
    // custom config to avoid conflict with other tests
    config.auth.htpasswd.file = path.join(
      storage,
      `${config.auth.htpasswd.file}-${cryptoUtils.generateRandomHexString()}`
    );
  }
  return config;
};

export async function initializeServer(configName: string): Promise<Application> {
  const config = await getConf(configName);
  setup(config.log ?? {});
  return startServer(config);
}
