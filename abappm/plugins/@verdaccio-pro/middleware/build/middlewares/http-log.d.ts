import { Request, Response, NextFunction } from 'express';
import { Config, Logger } from '@verdaccio/types';
declare const httpLog: (config: Config, logger: Logger) => (req: Request, _res: Response, next: NextFunction) => void;
export default httpLog;
