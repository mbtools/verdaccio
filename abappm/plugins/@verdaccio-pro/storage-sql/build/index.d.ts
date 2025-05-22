import { pluginUtils, searchUtils } from '@verdaccio/core';
import { Logger, Manifest, Config, TokenFilter, Token } from '@verdaccio/types';
import { Readable, Writable } from 'node:stream';
import { drizzle } from 'drizzle-orm/node-postgres';

type Database = ReturnType<typeof drizzle>;

type Method = 'get' | 'post' | 'put' | 'delete';

type Downloads = {
    date: string;
    count: number;
};
type DownloadsByVersion = {
    version: string;
    count: number;
};

declare class SqlStorageHandler implements pluginUtils.StorageHandler {
    logger: Logger;
    private package;
    private tarball;
    constructor(database: Database, logger: Logger);
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
    deleteTarball(fileName: string): Promise<void>;
}

type StorageConfig = {
    url: string;
};
declare class SqlStoragePlugin extends pluginUtils.Plugin<StorageConfig> implements pluginUtils.Storage<StorageConfig> {
    logger: Logger;
    config: Config;
    private storageConfig;
    private db;
    private token;
    private localPackage;
    private verdaccioSecret;
    private downloads;
    private eventLog;
    constructor(config: StorageConfig, options: pluginUtils.PluginOptions);
    init(): Promise<void>;
    getPackageStorage(packageName: string): SqlStorageHandler;
    getSecret(): Promise<string>;
    setSecret(secret: string): Promise<string | null>;
    get(): Promise<string[]>;
    add(packageName: string): Promise<void>;
    remove(packageName: string): Promise<void>;
    search(query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]>;
    private filterByQuery;
    private getScore;
    readTokens(filter: TokenFilter): Promise<Token[]>;
    saveToken(token: Token): Promise<any>;
    deleteToken(user: string, tokenKey: string): Promise<any>;
    incrementDownloads(filename: string): Promise<void>;
    getDownloads(timeslice: string, start: string, end?: string): Promise<Downloads[] | null>;
    getDownloadsByPackage(packageName: string, start: string, end?: string): Promise<Downloads[] | null>;
    getDownloadsByVersion(packageName: string, start: string, end?: string): Promise<DownloadsByVersion[] | null>;
    logActivity(user: string, method: Method, event: string, name: string, version?: string): Promise<void>;
    private escapeRegExp;
}

export { SqlStoragePlugin, type StorageConfig, SqlStoragePlugin as default };
