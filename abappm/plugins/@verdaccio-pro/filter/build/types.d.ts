import { Range } from 'semver';
export type PackageBlockRule = {
    scope: string;
} | {
    package: string;
} | {
    package: string;
    versions: string;
};
export type ParsedBlockKind = 'scope' | 'package' | undefined;
export type BlockStrategy = 'block' | 'replace';
interface ParsedBlockConfig {
    block: Range[];
    strategy?: BlockStrategy;
}
export type ParsedBlockRule = ParsedBlockConfig | ParsedBlockKind;
export {};
