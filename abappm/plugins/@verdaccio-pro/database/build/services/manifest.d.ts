import { Manifest } from '@verdaccio/types';
export type readmeVersion = {
    version: string;
    markdown: string;
};
export declare const getReadmesFromManifest: (manifest: Manifest) => readmeVersion[];
export declare const stripReadmesFromManifest: (manifest: Manifest) => Manifest;
export declare const mergeReadmesIntoManifest: (manifest: Manifest, readmes: readmeVersion[]) => Manifest;
export type metadataVersion = {
    version: string;
    description: string;
    keywords: string;
};
export declare const getMetadataFromManifest: (manifest: Manifest) => metadataVersion[];
