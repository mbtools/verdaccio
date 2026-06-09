export declare const getScopeFromName: (name: string) => string;
export declare const getPackageFromName: (name: string) => string;
export declare const getNameFromPackageAndScope: (packageName: string, scope: string) => string;
export declare const getVersionFromFilename: (filename: string) => string;
export declare const getPackageInfoFromPath: (path: string) => {
    name: string;
    version: string;
};
export declare const getISODate: (date: string) => string;
export declare const getISODates: (start: string, end?: string) => string[];
export declare const unescapeHtmlEntities: (json: string) => string;
