import { Logger } from '@verdaccio/types';
import { Database } from '../db';
import { TenantService } from './tenant';
type NameVersion = {
    name: string;
    version: string;
};
export declare class GlobalTadirService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger, tenant?: TenantService);
    exists(tadir: string[]): Promise<boolean>;
    check(tadir: string[]): Promise<NameVersion[]>;
    add(name: string, version: string, tadir: string[]): Promise<void>;
    remove(name: string, version: string): Promise<void>;
    get(name: string, version?: string): Promise<string[]>;
    clean(): Promise<void>;
}
export {};
