import { searchUtils } from '@verdaccio/core';
import { Callback, Logger, Manifest } from '@verdaccio/types';
import { Database } from '../db';
export type DistTagsList = {
    [name: string]: {
        [tag: string]: string;
    };
};
export declare class PackageService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger);
    exists(name: string): Promise<boolean>;
    create(name: string, manifest: Manifest): Promise<void>;
    read(name: string, noThrow?: boolean): Promise<Manifest>;
    save(name: string, manifest: Manifest): Promise<void>;
    update(name: string, handleUpdate: Callback): Promise<Manifest>;
    delete(name: string): Promise<void>;
    static search(db: Database, query: searchUtils.SearchQuery): Promise<searchUtils.SearchItemPkg[]>;
    getDistTags(names: string[]): Promise<DistTagsList>;
}
