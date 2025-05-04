import buildDebug from 'debug';

import { API_ERROR, errorUtils } from '@verdaccio/core';
import { logger } from '@verdaccio/logger';

const debug = buildDebug('verdaccio:server:plugins');

export const initializePlugin = async function <T>(
  pluginCategory: string,
  plugin: T,
  initMethod: (plugin: T, ...args: any[]) => Promise<void> | void,
  args: any[] = []
): Promise<void> {
  try {
    debug(`${pluginCategory} init start`);
    await initMethod(plugin, ...args);
    debug(`${pluginCategory} init end`);
  } catch (err: any) {
    debug('error: %o', err.message);
    logger.error(
      { error: err.message },
      `initializing ${pluginCategory} plugin has failed: @{error}`
    );
    throw errorUtils.getInternalError(API_ERROR.PLUGIN_ERROR);
  }
};
