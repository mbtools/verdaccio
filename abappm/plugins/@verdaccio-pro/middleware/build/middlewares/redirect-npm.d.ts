import { Request, Response, NextFunction } from 'express';
import { Logger } from '@verdaccio/types';
declare const redirectNpmStyleUrl: (logger: Logger) => (req: Request, res: Response, _next: NextFunction) => void;
export default redirectNpmStyleUrl;
