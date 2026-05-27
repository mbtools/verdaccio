import { Readable, Writable } from 'node:stream';
import { pluginUtils } from '@verdaccio/core';
import { Logger, Manifest } from '@verdaccio/types';
import { Database } from '@verdaccio-pro/database';
declare class SqlStorageHandler implements pluginUtils.StorageHandler {
    logger: Logger;
    private package;
    private tarball;
    private packageName;
    constructor(database: Database, logger: Logger, packageName: string);
    readPackage(packageName: string): Promise<Manifest>;
    hasPackage(packageName: string): Promise<boolean>;
    updatePackage(packageName: string, handleUpdate: (manifest: Manifest) => Promise<Manifest>): Promise<Manifest>;
    deletePackage(fileName: string): Promise<void>;
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
    deleteTarball(fileName: string): Promise<void>;
}
export default SqlStorageHandler;
