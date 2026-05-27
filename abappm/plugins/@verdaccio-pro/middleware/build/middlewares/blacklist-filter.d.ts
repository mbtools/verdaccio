import { Request, Response, NextFunction } from 'express';
declare const blacklistFilter: (req: Request, res: Response, next: NextFunction) => void;
export default blacklistFilter;
