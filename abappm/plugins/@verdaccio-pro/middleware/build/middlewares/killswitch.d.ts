import { Request, Response } from 'express';
/** Set this env var to arm the route; its value is the shared secret. */
export declare const KILLSWITCH_ENV = "VERDACCIO_PRO_KILLSWITCH";
type KillswitchExit = (code: number) => void;
/**
 * Returns a request handler that exits the process when the path secret matches.
 * Mount at `GET /-/_kill/:token`. Returns `null` when the env var is unset.
 */
declare const createKillswitch: (env?: NodeJS.ProcessEnv, exit?: KillswitchExit) => ((req: Request, res: Response) => void) | null;
export default createKillswitch;
