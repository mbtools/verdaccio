import { searchUtils } from '@verdaccio/core';
import { Callback, Logger, Manifest } from '@verdaccio/types';
import { Database } from '../db';
import { TenantService } from './tenant';
import { PackageAccess } from './access';
export type DistTagsList = {
    [name: string]: {
        [tag: string]: string;
    };
};
export type { PackageAccess } from './access';
export declare class PackageService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger, tenant?: TenantService);
    exists(name: string): Promise<boolean>;
    create(name: string, manifest: Manifest, options?: {
        access?: PackageAccess;
    }): Promise<void>;
    getAccess(name: string): Promise<PackageAccess>;
    setAccess(name: string, access: PackageAccess): Promise<void>;
    private getStoredAccess;
    read(name: string, noThrow?: boolean): Promise<Manifest>;
    save(name: string, manifest: Manifest, options?: {
        access?: PackageAccess;
    }): Promise<void>;
    update(name: string, handleUpdate: Callback): Promise<Manifest>;
    delete(name: string): Promise<void>;
    private static buildSearchQueries;
    static search(db: Database, query: searchUtils.SearchQuery): Promise<searchUtils.SearchItemPkg[]>;
    getDistTags(names: string[]): Promise<DistTagsList>;
}
