import { Request, Response } from 'express';
type KillswitchExit = (code: number) => void;
/**
 * Returns a request handler that exits the process after acknowledging the request.
 * Mount behind JWT auth at `GET /-/_kill`.
 */
declare const createKillswitch: (exit?: KillswitchExit) => ((req: Request, res: Response) => void);
export default createKillswitch;
