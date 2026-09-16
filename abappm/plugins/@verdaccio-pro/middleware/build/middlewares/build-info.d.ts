import { Request, Response } from 'express';
declare const BUILD_INFO_KEYS: readonly ["BUILD_DATE", "BUILD_SHA", "NODE_VERSION", "VERDACCIO_VERSION"];
type BuildInfoKey = (typeof BUILD_INFO_KEYS)[number];
export declare function getBuildInfoFromEnv(env?: NodeJS.ProcessEnv): Record<BuildInfoKey, string | null>;
export default function buildInfo(_req: Request, res: Response): void;
export {};
