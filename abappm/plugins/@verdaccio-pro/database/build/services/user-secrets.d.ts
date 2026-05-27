import { Logger } from '@verdaccio/types';
import { Database } from '../db';
export declare class UserSecretsService {
    private db;
    private logger;
    constructor(database: Database, logger: Logger);
    count(): Promise<number>;
    add(user: string, hash: string, email: string): Promise<void>;
    remove(user: string): Promise<void>;
    getHash(user: string): Promise<string | null>;
    getEmail(user: string): Promise<string | null>;
    changePassword(user: string, hash: string): Promise<void>;
    changeEmail(user: string, email: string): Promise<void>;
}
