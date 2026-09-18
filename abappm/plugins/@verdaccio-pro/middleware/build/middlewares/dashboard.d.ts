import { Request, Response } from 'express';
export declare const DASHBOARD_ROOT_ENV = "VERDACCIO_DASHBOARD_ROOT";
type Download = {
    date: string;
    count: number;
};
export interface DashboardStorage {
    get?: () => Promise<string[]>;
    getDownloads?: (timeslice: string, start: string, end?: string) => Promise<Download[] | null>;
    getStoragePlugin?: () => DashboardStorage;
    localStorage?: {
        getStoragePlugin?: () => DashboardStorage;
    };
}
type DashboardOptions = {
    rootDir?: string;
    maxFileBytes?: number;
    env?: NodeJS.ProcessEnv;
    now?: () => Date;
    uptime?: () => number;
    memoryUsage?: () => NodeJS.MemoryUsage;
};
export default function createDashboard(storage: DashboardStorage, options?: DashboardOptions): (req: Request, res: Response) => Promise<void>;
export {};
