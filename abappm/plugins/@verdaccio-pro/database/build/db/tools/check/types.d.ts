import { Database } from '../..';
export interface CheckResult {
    passed: boolean;
    errors: string[];
    warnings: string[];
}
export interface PackageRow {
    id: number;
    org_id: number | null;
    name: string;
    json: unknown;
    access: 'public' | 'restricted' | null;
    deleted: Date | null;
}
export interface CheckContext {
    db: Database;
    results: CheckResult;
    orgMap: Map<number, string>;
    publicOrgId: number;
    packages: PackageRow[];
}
export type CheckFn = (ctx: CheckContext) => Promise<void>;
