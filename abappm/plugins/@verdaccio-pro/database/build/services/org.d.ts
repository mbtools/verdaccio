import { Logger } from '@verdaccio/types';
import { Database } from '../db';
export declare const PUBLIC_PACKAGES = "@";
export declare class OrgService {
    private db;
    private logger;
    private orgCache;
    constructor(database: Database, logger: Logger);
    getOrgId(name: string): Promise<number>;
    getOrgIdfromPackage(name: string): Promise<number>;
}
