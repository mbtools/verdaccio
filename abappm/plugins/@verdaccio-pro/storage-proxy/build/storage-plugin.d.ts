import { pluginUtils, searchUtils } from '@verdaccio/core';
import { Config, Logger, Token, TokenFilter } from '@verdaccio/types';
import { default as ProxyStorageHandler } from './storage-handler';
export interface StorageConfig {
    database_backend: string;
    search_backend: string;
    packument_backend: string;
    tarball_backend: string;
    backends: any;
}
declare class ProxyStoragePlugin extends pluginUtils.Plugin<StorageConfig> implements pluginUtils.Storage<StorageConfig> {
    logger: Logger;
    config: Config;
    loadedBackends: any;
    private storageConfig;
    constructor(config: StorageConfig, options: pluginUtils.PluginOptions);
    init(): Promise<void>;
    getPackageStorage(packageName: string): ProxyStorageHandler;
    getSecret(): Promise<string>;
    setSecret(secret: string): Promise<string | null>;
    get(): Promise<string[]>;
    add(packageName: string): Promise<void>;
    remove(packageName: string): Promise<void>;
    search(query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]>;
    readTokens(filter: TokenFilter): Promise<Token[]>;
    saveToken(token: Token): Promise<any>;
    deleteToken(user: string, tokenKey: string): Promise<any>;
}
export default ProxyStoragePlugin;
