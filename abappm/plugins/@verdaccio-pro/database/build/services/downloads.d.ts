import { Logger } from '@verdaccio/types';
import { Database } from '../db';
import { TenantService } from './tenant';
export type Downloads = {
    date: string;
    count: number;
};
export type DownloadsByVersion = {
    version: string;
    count: number;
};
export declare class DownloadsService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger, tenant?: TenantService);
    increment(path: string): Promise<void>;
    getDownloads(timeslice: string, start: string, end?: string): Promise<Downloads[] | null>;
    getByPackage(packageName: string, start: string, end?: string): Promise<Downloads[] | null>;
    getByVersion(packageName: string, start: string, end?: string): Promise<DownloadsByVersion[] | null>;
}
