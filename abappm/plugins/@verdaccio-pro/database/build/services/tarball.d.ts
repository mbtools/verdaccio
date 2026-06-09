import { Readable, Writable } from 'stream';
import { Logger } from '@verdaccio/types';
import { Database } from '../db';
import { TenantService } from './tenant';
export declare class TarballService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger, tenant?: TenantService);
    exists(packageName: string, fileName: string): Promise<boolean>;
    read(packageName: string, fileName: string, { signal }: {
        signal: AbortSignal;
    }): Promise<Readable>;
    write(packageName: string, fileName: string, { signal }: {
        signal: AbortSignal;
    }): Promise<Writable>;
    delete(packageName: string, fileName: string): Promise<void>;
    remove(packageName: string): Promise<void>;
}
