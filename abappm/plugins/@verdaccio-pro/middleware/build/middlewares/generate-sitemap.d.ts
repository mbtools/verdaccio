import { Request, Response } from 'express';
import { Logger } from '@verdaccio/types';
type SitemapStorage = {
    get(): Promise<string[]>;
    localStorage?: {
        getStoragePlugin?: () => SitemapStorage;
    };
};
declare const generateSitemap: (storage: SitemapStorage, logger: Logger) => (req: Request, res: Response) => Promise<void>;
export default generateSitemap;
