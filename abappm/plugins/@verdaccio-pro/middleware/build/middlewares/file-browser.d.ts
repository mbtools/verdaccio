import { Request, Response } from 'express';
type FileBrowserOptions = {
    rootDir?: string;
    maxFileBytes?: number;
};
/**
 * Returns a request handler that lists directories and reads allowlisted text files.
 * Mount behind JWT auth at `GET /-/_files`.
 */
declare const createFileBrowser: (options?: FileBrowserOptions) => ((req: Request, res: Response) => Promise<void>);
export default createFileBrowser;
