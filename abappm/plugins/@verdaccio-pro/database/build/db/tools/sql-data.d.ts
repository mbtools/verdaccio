import { Database } from '..';
export declare const IMPORT_TABLE_ORDER: readonly ["users", "roles", "events", "orgs", "secrets", "counter", "clerk_events", "paddle_events", "user_secrets", "tokens", "teams", "packages", "local_packages", "dist_tags", "metadata", "readmes", "tarballs", "downloads", "gtadir", "org_members", "team_members", "team_packages", "event_log", "clerk_users", "clerk_orgs", "paddle_subscriptions", "clerk_members"];
export declare const TRUNCATE_TABLE_ORDER: ("users" | "packages" | "user_secrets" | "secrets" | "tokens" | "roles" | "orgs" | "org_members" | "teams" | "team_members" | "local_packages" | "team_packages" | "readmes" | "metadata" | "dist_tags" | "tarballs" | "downloads" | "events" | "event_log" | "clerk_users" | "clerk_orgs" | "clerk_members" | "clerk_events" | "paddle_subscriptions" | "paddle_events" | "gtadir" | "counter")[];
interface ColumnInfo {
    column_name: string;
    data_type: string;
    udt_name: string;
}
export declare function dollarQuote(value: string, baseTag?: string): string;
export declare function formatSqlValue(value: unknown, dataType: string, udtName: string): string;
export declare function getPublicTables(db: Database): Promise<string[]>;
export declare function getTableColumns(db: Database, tableName: string): Promise<ColumnInfo[]>;
export declare function exportTable(db: Database, tableName: string, outputDir: string): Promise<number>;
export declare function exportPublicSchema(db: Database, outputDir: string): Promise<void>;
export declare function parseSqlStatements(content: string): string[];
export declare function importTableFile(db: Database, filePath: string): Promise<number>;
export declare function resetSerialSequences(db: Database): Promise<void>;
export declare function truncatePublicTables(db: Database): Promise<void>;
export declare function importPublicSchema(db: Database, inputDir: string): Promise<void>;
export {};
