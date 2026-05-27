import { Logger } from '@verdaccio/types';
import { Database } from '../db';
export declare class VerdaccioSecretService {
    private db;
    private logger;
    constructor(database: Database, logger: Logger);
    set(secret: string): Promise<string>;
    get(): Promise<string>;
}
