import { Readable, Writable } from 'node:stream';
import { pluginUtils } from '@verdaccio/core';
import { Logger, Manifest } from '@verdaccio/types';
import { StorageConfig } from './storage-plugin';
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
export default ProxyStorageHandler;
