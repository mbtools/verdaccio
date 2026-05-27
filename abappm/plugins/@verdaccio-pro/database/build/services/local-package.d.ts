import { Logger } from '@verdaccio/types';
import { Database } from '../db';
export declare class LocalPackagesService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger);
    add(name: string): Promise<void>;
    remove(name: string): Promise<void>;
    get(): Promise<string[]>;
    clean(): Promise<void>;
}
