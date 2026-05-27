import { Request, Response, NextFunction } from 'express';
declare const setSecurityHeaders: (req: Request, res: Response, next: NextFunction) => void;
export default setSecurityHeaders;
