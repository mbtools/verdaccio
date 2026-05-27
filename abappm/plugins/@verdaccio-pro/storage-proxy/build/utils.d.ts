import { pluginUtils } from '@verdaccio/core';
import { StorageConfig } from './storage-plugin';
export declare function loadStoragePlugins(backends: unknown, options: pluginUtils.PluginOptions, pluginPrefix?: string): Promise<pluginUtils.Storage<unknown>[]>;
export declare function getBackend(backends: any, pluginId: string): pluginUtils.Storage<StorageConfig>;
