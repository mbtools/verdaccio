import { Logger, TokenFilter, Token as VerdaccioToken } from '@verdaccio/types';
import { Database } from '../db';
export interface Token {
    user: string;
    token: string;
    key: string;
    cidr?: string[] | null;
    readonly: boolean;
    created: Date;
    updated?: Date;
}
export declare class TokenService {
    private db;
    private logger;
    constructor(database: Database, logger: Logger);
    read({ user }: TokenFilter): Promise<VerdaccioToken[]>;
    save(token: VerdaccioToken): Promise<void>;
    delete(user: string, key: string): Promise<void>;
    private static toVerdaccioToken;
    private static fromVerdaccioToken;
}
