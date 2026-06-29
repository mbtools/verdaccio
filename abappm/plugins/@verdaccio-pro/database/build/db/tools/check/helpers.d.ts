import { AnyColumn, SQL } from '../../../../node_modules/drizzle-orm';
import { CheckContext } from './types';
type PackageKeyedTable = {
    org_id: AnyColumn;
    name: AnyColumn;
};
export declare function addError(ctx: CheckContext, message: string): void;
export declare function addWarning(ctx: CheckContext, message: string): void;
export declare function orgIdCondition(table: PackageKeyedTable, orgId: number | null): SQL | undefined;
export declare function packageKeyCondition(table: PackageKeyedTable, orgId: number | null, packageName: string): SQL | undefined;
export declare function validateScopedOrgId(ctx: CheckContext, packageName: string, orgId: number | null): boolean;
export declare function validateUnscopedOrgId(ctx: CheckContext, packageName: string, orgId: number | null): boolean;
export declare function validateChildOrgId(ctx: CheckContext, packageName: string, expectedOrgId: number | null, actualOrgId: number | null, table: string, detail: string, isScoped: boolean): void;
export {};
