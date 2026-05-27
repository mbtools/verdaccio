import { Logger } from '@verdaccio/types';
import { Database } from '../db';
export declare const ANONYMOUS_USER = "#";
export type Method = 'get' | 'post' | 'put' | 'delete';
export declare class EventLogService {
    private db;
    private logger;
    private tenant;
    private eventCache;
    private userCache;
    constructor(database: Database, logger: Logger);
    log(user: string, method: Method, event: string, name: string, version?: string): Promise<void>;
    private getUserId;
    private getEventId;
}
