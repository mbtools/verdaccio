import { Request, Response, NextFunction } from 'express';
declare const userAgentFilter: (pattern: string) => (req: Request, _res: Response, next: NextFunction) => void;
export default userAgentFilter;
