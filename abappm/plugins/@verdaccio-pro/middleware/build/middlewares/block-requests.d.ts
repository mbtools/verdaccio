import { Request, Response, NextFunction } from 'express';
declare const blockUnwantedRequests: (req: Request, res: Response, next: NextFunction) => void;
export default blockUnwantedRequests;
