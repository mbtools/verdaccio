import { Request, Response } from 'express';
import { Logger } from '@verdaccio/types';
type SitemapStorage = {
    get(): Promise<string[]>;
    localStorage?: {
        getStoragePlugin?: () => SitemapStorage;
    };
};
declare function getBaseUrl(req: Request): string;
declare function buildPackageUrl(packageName: string): string;
declare function buildSitemapXml(baseUrl: string, packageNames: string[]): string;
declare const generateSitemap: (storage: SitemapStorage, logger: Logger) => (req: Request, res: Response) => Promise<void>;
export { buildPackageUrl, buildSitemapXml, getBaseUrl };
export default generateSitemap;
