import { pluginUtils, searchUtils } from '@verdaccio/core';
import { Config, Logger, Token, TokenFilter } from '@verdaccio/types';
import { Method, Downloads, DownloadsByVersion } from '@verdaccio-pro/database';
import { default as SqlStorageHandler } from './storage-handler';
export interface StorageConfig {
    url?: string;
}
declare class SqlStoragePlugin extends pluginUtils.Plugin<StorageConfig> implements pluginUtils.Storage<StorageConfig> {
    logger: Logger;
    config: Config;
    private storageConfig;
    private db;
    private tenant;
    private packageService;
    private tarballService;
    private token;
    private localPackage;
    private verdaccioSecret;
    private downloads;
    private eventLog;
    private gtadir;
    constructor(config: StorageConfig, options: pluginUtils.PluginOptions);
    init(): Promise<void>;
    getPackageStorage(packageName: string): SqlStorageHandler;
    getSecret(): Promise<string>;
    setSecret(secret: string): Promise<string | null>;
    get(): Promise<string[]>;
    add(packageName: string): Promise<void>;
    remove(packageName: string): Promise<void>;
    search(query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]>;
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
export default SqlStoragePlugin;
