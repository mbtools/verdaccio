export declare const permissionEnum: import('../../../node_modules/drizzle-orm/pg-core').PgEnum<["r", "w"]>;
export declare const timesliceEnum: import('../../../node_modules/drizzle-orm/pg-core').PgEnum<["d", "m", "y", "t"]>;
export declare const methodEnum: import('../../../node_modules/drizzle-orm/pg-core').PgEnum<["get", "post", "put", "delete"]>;
export declare const subscriptionStatusEnum: import('../../../node_modules/drizzle-orm/pg-core').PgEnum<["trialing", "active", "past_due", "paused", "canceled"]>;
export declare const tsVector: {
    <TConfig extends Record<string, any>>(fieldConfig?: TConfig | undefined): import('../../../node_modules/drizzle-orm/pg-core').PgCustomColumnBuilder<{
        dataType: "custom";
        data: string;
        driverParam: unknown;
    }>;
    (dbName: string, fieldConfig?: unknown): import('../../../node_modules/drizzle-orm/pg-core').PgCustomColumnBuilder<{
        dataType: "custom";
        data: string;
        driverParam: unknown;
    }>;
};
/**
 * Users
 */
export declare const users: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "users";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "users";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "users";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "users";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "users";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        user: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        fullname: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        description: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        email: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        email_verified: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgBooleanBuilder>>, {
            name: string;
            tableName: "users";
            dataType: "boolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        homepage: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        github: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        links: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"users", import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder, {
            name: string;
            tableName: "users";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * User Secrets
 */
export declare const userSecrets: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "user_secrets";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"user_secrets", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "user_secrets";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"user_secrets", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "user_secrets";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"user_secrets", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "user_secrets";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"user_secrets", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "user_secrets";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        user: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"user_secrets", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "user_secrets";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        hash: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"user_secrets", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "user_secrets";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        email: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"user_secrets", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "user_secrets";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Roles
 */
export declare const roles: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "roles";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"roles", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "roles";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"roles", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "roles";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"roles", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "roles";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"roles", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "roles";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        role: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"roles", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "roles";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        description: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"roles", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "roles";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Organizations
 */
export declare const orgs: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "orgs";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "orgs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "orgs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "orgs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "orgs";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "orgs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "orgs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        description: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "orgs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        homepage: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "orgs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        github: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "orgs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        links: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"orgs", import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder, {
            name: string;
            tableName: "orgs";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Organization Members
 */
export declare const orgMembers: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "org_members";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"org_members", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "org_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"org_members", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "org_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"org_members", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "org_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"org_members", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "org_members";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"org_members", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "org_members";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        user_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"org_members", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "org_members";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        role_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"org_members", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "org_members";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Teams
 */
export declare const teams: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "teams";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"teams", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "teams";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"teams", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "teams";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"teams", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "teams";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"teams", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "teams";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"teams", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "teams";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        team: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"teams", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "teams";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        description: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"teams", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "teams";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Team Members
 */
export declare const teamMembers: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "team_members";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_members", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "team_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_members", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "team_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_members", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "team_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_members", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "team_members";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_members", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "team_members";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        team_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_members", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "team_members";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        user_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_members", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "team_members";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Secrets
 */
export declare const secrets: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "secrets";
    schema: undefined;
    columns: {
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"secrets", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "secrets";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"secrets", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "secrets";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"secrets", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "secrets";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        value: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"secrets", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "secrets";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Tokens
 */
export declare const tokens: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "tokens";
    schema: undefined;
    columns: {
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tokens", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "tokens";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tokens", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "tokens";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tokens", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "tokens";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        user: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tokens", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "tokens";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        key: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tokens", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "tokens";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        token: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tokens", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "tokens";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        cidr: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tokens", import('../../../node_modules/drizzle-orm/pg-core').SetDimensions<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, 1>, {
            name: string;
            tableName: "tokens";
            dataType: "string";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        readonly: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tokens", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgBooleanBuilder>, {
            name: string;
            tableName: "tokens";
            dataType: "boolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Local Packages
 */
export declare const localPackages: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "local_packages";
    schema: undefined;
    columns: {
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"local_packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "local_packages";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"local_packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "local_packages";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"local_packages", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "local_packages";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"local_packages", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "local_packages";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"local_packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "local_packages";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Packages
 */
export declare const packages: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "packages";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"packages", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "packages";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "packages";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "packages";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"packages", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "packages";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"packages", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "packages";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "packages";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        json: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder>, {
            name: string;
            tableName: "packages";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Team Packages
 */
export declare const teamPackages: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "team_packages";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_packages", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "team_packages";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "team_packages";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_packages", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "team_packages";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_packages", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "team_packages";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_packages", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "team_packages";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        team_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_packages", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "team_packages";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        package_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_packages", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "team_packages";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        permission: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"team_packages", import('../../../node_modules/drizzle-orm/pg-core').Set$Type<import('../../../node_modules/drizzle-orm/pg-core').PgEnumColumnBuilder<["r", "w"]>, string>, {
            name: string;
            tableName: "team_packages";
            dataType: "string enum";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["r", "w"];
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Readmes
 */
export declare const readmes: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "readmes";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "readmes";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "readmes";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "readmes";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "readmes";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "readmes";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "readmes";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        version: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "readmes";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        markdown: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "readmes";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        search_english: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').SetHasGenerated<import('../../../node_modules/drizzle-orm/pg-core').PgCustomColumnBuilder<{
            dataType: "custom";
            data: string;
            driverParam: unknown;
        }>>, {
            name: string;
            tableName: "readmes";
            dataType: "custom";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: true;
        }>;
        search_german: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"readmes", import('../../../node_modules/drizzle-orm/pg-core').SetHasGenerated<import('../../../node_modules/drizzle-orm/pg-core').PgCustomColumnBuilder<{
            dataType: "custom";
            data: string;
            driverParam: unknown;
        }>>, {
            name: string;
            tableName: "readmes";
            dataType: "custom";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: true;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Metadata
 */
export declare const metadata: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "metadata";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "metadata";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "metadata";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "metadata";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "metadata";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "metadata";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "metadata";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        version: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "metadata";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        description: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "metadata";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        keywords: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "metadata";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        search_english: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').SetHasGenerated<import('../../../node_modules/drizzle-orm/pg-core').PgCustomColumnBuilder<{
            dataType: "custom";
            data: string;
            driverParam: unknown;
        }>>, {
            name: string;
            tableName: "metadata";
            dataType: "custom";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: true;
        }>;
        search_german: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"metadata", import('../../../node_modules/drizzle-orm/pg-core').SetHasGenerated<import('../../../node_modules/drizzle-orm/pg-core').PgCustomColumnBuilder<{
            dataType: "custom";
            data: string;
            driverParam: unknown;
        }>>, {
            name: string;
            tableName: "metadata";
            dataType: "custom";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: true;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Dist Tags
 */
export declare const distTags: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "dist_tags";
    schema: undefined;
    columns: {
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"dist_tags", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "dist_tags";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"dist_tags", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "dist_tags";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"dist_tags", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "dist_tags";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"dist_tags", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "dist_tags";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"dist_tags", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "dist_tags";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        tag: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"dist_tags", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "dist_tags";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        version: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"dist_tags", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "dist_tags";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Tarballs
 */
export declare const tarballs: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "tarballs";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "tarballs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "tarballs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "tarballs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "tarballs";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "tarballs";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "tarballs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        version: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "tarballs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        filename: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "tarballs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        data: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgByteaBuilder>, {
            name: string;
            tableName: "tarballs";
            dataType: "object buffer";
            data: Buffer<ArrayBufferLike>;
            driverParam: Buffer<ArrayBufferLike>;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        size: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"tarballs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder>, {
            name: string;
            tableName: "tarballs";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Downloads
 */
export declare const downloads: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "downloads";
    schema: undefined;
    columns: {
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "downloads";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "downloads";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        timeslice: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').Set$Type<import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgEnumColumnBuilder<["d", "m", "y", "t"]>>, string>, {
            name: string;
            tableName: "downloads";
            dataType: "string enum";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["d", "m", "y", "t"];
            identity: undefined;
            generated: undefined;
        }>;
        year: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "downloads";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        month: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "downloads";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        date: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').PgDateStringBuilder, {
            name: string;
            tableName: "downloads";
            dataType: "string date";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "downloads";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        version: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "downloads";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        count: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"downloads", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder>, {
            name: string;
            tableName: "downloads";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Events
 */
export declare const events: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "events";
    schema: undefined;
    columns: {
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"events", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "events";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        event: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "events";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Event Log
 */
export declare const eventLog: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "event_log";
    schema: undefined;
    columns: {
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"event_log", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "event_log";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"event_log", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "event_log";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        timestamp: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"event_log", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "event_log";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        user_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"event_log", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "event_log";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        method: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"event_log", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgEnumColumnBuilder<["get", "post", "put", "delete"]>>, {
            name: string;
            tableName: "event_log";
            dataType: "string enum";
            data: "delete" | "get" | "post" | "put";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["get", "post", "put", "delete"];
            identity: undefined;
            generated: undefined;
        }>;
        event_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"event_log", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "event_log";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"event_log", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "event_log";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        version: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"event_log", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "event_log";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Clerk User Management
 * https://clerk.com/
 * JSON Reference
 * https://github.com/clerk/javascript/blob/main/packages/types/src/json.ts
 */
/**
 * Clerk Users
 */
export declare const clerkUsers: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "clerk_users";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_users", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "clerk_users";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_users", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "clerk_users";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_users", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "clerk_users";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_user: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_users", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "clerk_users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_json: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_users", import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder, {
            name: string;
            tableName: "clerk_users";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        user_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_users", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "clerk_users";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        user: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_users", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "clerk_users";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Clerk Organizations
 */
export declare const clerkOrgs: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "clerk_orgs";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_orgs", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "clerk_orgs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_orgs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "clerk_orgs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_orgs", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "clerk_orgs";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_org: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_orgs", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "clerk_orgs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_json: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_orgs", import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder, {
            name: string;
            tableName: "clerk_orgs";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_orgs", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "clerk_orgs";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_orgs", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "clerk_orgs";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Clerk Organization Members
 */
export declare const clerkMembers: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "clerk_members";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_members", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "clerk_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_members", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "clerk_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_members", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "clerk_members";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_member: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_members", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "clerk_members";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_json: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_members", import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder, {
            name: string;
            tableName: "clerk_members";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_org: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_members", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "clerk_members";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_user: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_members", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "clerk_members";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        role: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_members", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "clerk_members";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Clerk Events
 */
export declare const clerkEvents: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "clerk_events";
    schema: undefined;
    columns: {
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_events", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder>, {
            name: string;
            tableName: "clerk_events";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        event_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "clerk_events";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        event_type: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "clerk_events";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        occurred_at: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>, {
            name: string;
            tableName: "clerk_events";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        processed_at: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "clerk_events";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_json: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"clerk_events", import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder, {
            name: string;
            tableName: "clerk_events";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Paddle Payments
 * https://paddle.com/
 * API and Webhooks Reference
 * https://developer.paddle.com/api-reference/
 * https://developer.paddle.com/webhooks/
 */
/**
 * Paddle Subscriptions
 */
export declare const paddleSubscriptions: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "paddle_subscriptions";
    schema: undefined;
    columns: {
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        clerk_user: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        paddle_customer_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        paddle_subscription_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        price_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        status: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgEnumColumnBuilder<["trialing", "active", "past_due", "paused", "canceled"]>>>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "string enum";
            data: "trialing" | "active" | "past_due" | "paused" | "canceled";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["trialing", "active", "past_due", "paused", "canceled"];
            identity: undefined;
            generated: undefined;
        }>;
        current_period_end: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        cancel_at_period_end: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgBooleanBuilder>>, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "boolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        paddle_json: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_subscriptions", import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder, {
            name: string;
            tableName: "paddle_subscriptions";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Paddle Events
 */
export declare const paddleEvents: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "paddle_events";
    schema: undefined;
    columns: {
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_events", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder>, {
            name: string;
            tableName: "paddle_events";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        event_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "paddle_events";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        event_type: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "paddle_events";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        occurred_at: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>, {
            name: string;
            tableName: "paddle_events";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        processed_at: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_events", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "paddle_events";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        paddle_json: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"paddle_events", import('../../../node_modules/drizzle-orm/pg-core').PgJsonbBuilder, {
            name: string;
            tableName: "paddle_events";
            dataType: "object json";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Global Object Directory (GTADIR)
 */
export declare const gtadir: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "gtadir";
    schema: undefined;
    columns: {
        deleted: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder, {
            name: string;
            tableName: "gtadir";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        created: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "gtadir";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updated: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "gtadir";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder, {
            name: string;
            tableName: "gtadir";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        pgmid: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "gtadir";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        object: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "gtadir";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        object_name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "gtadir";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        org_id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder, {
            name: string;
            tableName: "gtadir";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        name: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "gtadir";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        version: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"gtadir", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').PgTextBuilder<[string, ...string[]]>>, {
            name: string;
            tableName: "gtadir";
            dataType: "string";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Boilerplate Counter for Testing
 */
export declare const counterSchema: import('../../../node_modules/drizzle-orm/pg-core').PgTableWithColumns<{
    name: "counter";
    schema: undefined;
    columns: {
        id: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"counter", import('../../../node_modules/drizzle-orm/pg-core').SetIsPrimaryKey<import('../../../node_modules/drizzle-orm/pg-core').PgSerialBuilder>, {
            name: string;
            tableName: "counter";
            dataType: "number int32";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        count: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"counter", import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgIntegerBuilder>, {
            name: string;
            tableName: "counter";
            dataType: "number int32";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        updatedAt: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"counter", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>>, {
            name: string;
            tableName: "counter";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
        createdAt: import('../../../node_modules/drizzle-orm/pg-core').PgBuildColumn<"counter", import('../../../node_modules/drizzle-orm/pg-core').SetNotNull<import('../../../node_modules/drizzle-orm/pg-core').SetHasDefault<import('../../../node_modules/drizzle-orm/pg-core').PgTimestampBuilder>>, {
            name: string;
            tableName: "counter";
            dataType: "object date";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            identity: undefined;
            generated: undefined;
        }>;
    };
    dialect: "pg";
}>;
