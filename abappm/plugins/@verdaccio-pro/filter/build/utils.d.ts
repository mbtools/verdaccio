import { Manifest, Logger } from '@verdaccio/types';
import { BlockStrategy, PackageBlockRule, ParsedBlockRule } from './types';
export declare function isScopeRule(rule: PackageBlockRule): rule is {
    scope: string;
};
export declare function isPackageRule(rule: PackageBlockRule): rule is {
    package: string;
    versions: never;
};
export declare function isPackageAndVersionRule(rule: PackageBlockRule): rule is {
    package: string;
    versions: string;
    strategy?: BlockStrategy;
};
/**
 * Filter out all blocked package versions. If all package is blocked, or it's scope is blocked - block all versions.
 * @param packageInfo
 * @param block
 * @param logger
 */
export declare function filterBlockedVersions(packageInfo: Readonly<Manifest>, block: Map<string, ParsedBlockRule>, logger: Logger): Manifest;
