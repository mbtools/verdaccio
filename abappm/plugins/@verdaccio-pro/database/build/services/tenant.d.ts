import { Logger } from '@verdaccio/types';
import { OrgService } from './org';
import { Database } from '../db';
export declare class TenantService {
    private org;
    constructor(database: Database, logger: Logger, org?: OrgService);
    get(name: string): Promise<number>;
}
