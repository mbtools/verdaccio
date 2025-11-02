import { pluginUtils, searchUtils } from '@verdaccio/core';
import { Logger, Manifest, Config, TokenFilter, Token } from '@verdaccio/types';
import { Readable, Writable } from 'node:stream';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as drizzle_orm_pg_core from 'drizzle-orm/pg-core';

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

interface StorageConfig {
    url?: string;
}
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

/**
 * Packages
 */
declare const packages: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "packages";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "packages";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "packages";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "packages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        json: drizzle_orm_pg_core.PgColumn<{
            name: "json";
            tableName: "packages";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Metadata
 */
declare const metadata: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "metadata";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "metadata";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "metadata";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "metadata";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "metadata";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "metadata";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "metadata";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        version: drizzle_orm_pg_core.PgColumn<{
            name: "version";
            tableName: "metadata";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "metadata";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        keywords: drizzle_orm_pg_core.PgColumn<{
            name: "keywords";
            tableName: "metadata";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        search_english: drizzle_orm_pg_core.PgColumn<{
            name: "search_english";
            tableName: "metadata";
            dataType: "custom";
            columnType: "PgCustomColumn";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: {
                type: "always";
            };
        }, {}, {
            pgColumnBuilderBrand: "PgCustomColumnBuilderBrand";
        }>;
        search_german: drizzle_orm_pg_core.PgColumn<{
            name: "search_german";
            tableName: "metadata";
            dataType: "custom";
            columnType: "PgCustomColumn";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: {
                type: "always";
            };
        }, {}, {
            pgColumnBuilderBrand: "PgCustomColumnBuilderBrand";
        }>;
    };
    dialect: "pg";
}>;

declare const unescapeHtmlEntities: (json: string) => string;
type metadataVersion = {
    version: string;
    description: string;
    keywords: string;
};
declare const getMetadataFromManifest: (manifest: Manifest) => metadataVersion[];

export { SqlStoragePlugin, type StorageConfig, SqlStoragePlugin as default, getMetadataFromManifest, metadata, packages, unescapeHtmlEntities };
