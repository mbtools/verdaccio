import { Logger } from '@verdaccio/types';
import { Database } from '../db';
import { TenantService } from './tenant';
export declare class LocalPackagesService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger, tenant?: TenantService);
    add(name: string): Promise<void>;
    remove(name: string): Promise<void>;
    get(): Promise<string[]>;
    clean(): Promise<void>;
}
