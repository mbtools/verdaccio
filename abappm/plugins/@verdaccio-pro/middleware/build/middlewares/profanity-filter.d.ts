import { Request, Response, NextFunction } from 'express';
declare const profanityFilter: (req: Request, res: Response, next: NextFunction) => void;
export default profanityFilter;
