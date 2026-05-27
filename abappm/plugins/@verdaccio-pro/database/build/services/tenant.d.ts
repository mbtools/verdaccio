import { Logger } from '@verdaccio/types';
import { Database } from '../db';
export declare class TenantService {
    private org;
    constructor(database: Database, logger: Logger);
    get(name: string): Promise<number>;
}
