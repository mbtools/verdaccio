import { pluginUtils, searchUtils } from '@verdaccio/core';
import { Logger, Manifest, Config, TokenFilter, Token } from '@verdaccio/types';
import { Readable, Writable } from 'node:stream';

declare class ProxyStorageHandler implements pluginUtils.StorageHandler {
    config: StorageConfig;
    logger: Logger;
    packageName: string;
    packumentPackageStorage: pluginUtils.StorageHandler;
    tarballPackageStorage: pluginUtils.StorageHandler;
    constructor(config: StorageConfig, logger: Logger, loadedBackends: any, packageName: string);
    readPackage(packageName: string): Promise<Manifest>;
    hasPackage(packageName: string): Promise<boolean>;
    updatePackage(packageName: string, handleUpdate: (manifest: Manifest) => Promise<Manifest>): Promise<Manifest>;
    deletePackage(filename: string): Promise<void>;
    removePackage(packageName: string): Promise<void>;
    createPackage(packageName: string, manifest: Manifest): Promise<void>;
    savePackage(packageName: string, manifest: Manifest): Promise<void>;
    hasTarball(fileName: string): Promise<boolean>;
    readTarball(fileName: string, { signal }: {
        signal: AbortSignal;
    }): Promise<Readable>;
    writeTarball(fileName: string, { signal }: {
        signal: AbortSignal;
    }): Promise<Writable>;
}

type StorageConfig = {
    database_backend: string;
    search_backend: string;
    packument_backend: string;
    tarball_backend: string;
    backends: any;
};
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

export { ProxyStoragePlugin, type StorageConfig, ProxyStoragePlugin as default };
