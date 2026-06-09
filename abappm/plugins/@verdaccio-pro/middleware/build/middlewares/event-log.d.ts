import { Request, Response, NextFunction } from 'express';
import { Logger } from '@verdaccio/types';
type Method = 'get' | 'post' | 'put' | 'delete';
export interface ActivityStorage {
    logActivity?: (user: string, method: Method, event: string, name: string, version?: string) => Promise<void>;
    incrementDownloads?: (filename: string) => Promise<void>;
}
declare const eventLog: (storage: ActivityStorage, logger: Logger) => (req: Request, res: Response, next: NextFunction) => void;
export default eventLog;
