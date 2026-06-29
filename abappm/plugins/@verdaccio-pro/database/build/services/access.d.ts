import { Manifest } from '@verdaccio/types';
export type PackageAccess = 'public' | 'restricted';
export declare const SCOPED_DEFAULT_ACCESS: PackageAccess;
export type PublishBody = Manifest & {
    access?: unknown;
};
export declare function isValidPackageAccess(value: unknown): value is PackageAccess;
export declare function resolveStoredAccess(name: string, requestedAccess?: PackageAccess | null): PackageAccess | null;
export declare function extractAccessFromPublishBody(manifest: PublishBody): PackageAccess | undefined;
export declare function stripAccessFromManifest(manifest: PublishBody): Manifest;
export declare function effectiveAccess(name: string, stored: PackageAccess | null | undefined): PackageAccess;
