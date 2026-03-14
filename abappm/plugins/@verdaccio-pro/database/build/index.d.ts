import { drizzle } from 'drizzle-orm/node-postgres';
import { Logger, Manifest, Callback, TokenFilter, Token as Token$1 } from '@verdaccio/types';
import { DefaultLogger } from 'drizzle-orm/logger';
import z from 'zod';
import * as drizzle_orm from 'drizzle-orm';
import * as drizzle_orm_pg_core from 'drizzle-orm/pg-core';
import { searchUtils } from '@verdaccio/core';
import { Readable, Writable } from 'stream';

type Database = ReturnType<typeof drizzle>;
declare const getDatabase: (url: string, logger?: Logger) => Database;

declare const loggerFactory: (logger?: Logger) => DefaultLogger | undefined;

declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodString>;
    DATABASE_SECRET: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodDefault<z.ZodString>;
    DB_POOL_SIZE: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    DB_SSL: z.ZodDefault<z.ZodDefault<z.ZodPipe<z.ZodCoercedString<unknown>, z.ZodTransform<boolean, string>>>>;
    DB_SSL_REJECT_UNAUTHORIZED: z.ZodDefault<z.ZodDefault<z.ZodPipe<z.ZodCoercedString<unknown>, z.ZodTransform<boolean, string>>>>;
    DB_SSL_CA_PATH: z.ZodOptional<z.ZodString>;
    DB_SSL_CERT_PATH: z.ZodOptional<z.ZodString>;
    DB_SSL_KEY_PATH: z.ZodOptional<z.ZodString>;
    DB_SSL_CA: z.ZodOptional<z.ZodString>;
    DB_SSL_CERT: z.ZodOptional<z.ZodString>;
    DB_SSL_KEY: z.ZodOptional<z.ZodString>;
    DB_LOGGING: z.ZodDefault<z.ZodDefault<z.ZodPipe<z.ZodCoercedString<unknown>, z.ZodTransform<boolean, string>>>>;
    DB_MIGRATING: z.ZodDefault<z.ZodDefault<z.ZodPipe<z.ZodCoercedString<unknown>, z.ZodTransform<boolean, string>>>>;
    DB_SEEDING: z.ZodDefault<z.ZodDefault<z.ZodPipe<z.ZodCoercedString<unknown>, z.ZodTransform<boolean, string>>>>;
    DB_RESET: z.ZodDefault<z.ZodDefault<z.ZodPipe<z.ZodCoercedString<unknown>, z.ZodTransform<boolean, string>>>>;
    DB_FALLBACK: z.ZodDefault<z.ZodDefault<z.ZodPipe<z.ZodCoercedString<unknown>, z.ZodTransform<boolean, string>>>>;
    DB_SALT: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
type Env = z.infer<typeof envSchema>;
declare const ENV: Env;

declare const permissionEnum: drizzle_orm_pg_core.PgEnum<["r", "w"]>;
declare const timesliceEnum: drizzle_orm_pg_core.PgEnum<["d", "m", "y", "t"]>;
declare const methodEnum: drizzle_orm_pg_core.PgEnum<["get", "post", "put", "delete"]>;
declare const bytea: {
    (): drizzle_orm_pg_core.PgCustomColumnBuilder<{
        name: "";
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: Buffer<ArrayBufferLike>;
        driverParam: unknown;
        enumValues: undefined;
    }>;
    <TConfig extends Record<string, any>>(fieldConfig?: TConfig | undefined): drizzle_orm_pg_core.PgCustomColumnBuilder<{
        name: "";
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: Buffer<ArrayBufferLike>;
        driverParam: unknown;
        enumValues: undefined;
    }>;
    <TName extends string>(dbName: TName, fieldConfig?: unknown): drizzle_orm_pg_core.PgCustomColumnBuilder<{
        name: TName;
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: Buffer<ArrayBufferLike>;
        driverParam: unknown;
        enumValues: undefined;
    }>;
};
declare const tsVector: {
    (): drizzle_orm_pg_core.PgCustomColumnBuilder<{
        name: "";
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: string;
        driverParam: unknown;
        enumValues: undefined;
    }>;
    <TConfig extends Record<string, any>>(fieldConfig?: TConfig | undefined): drizzle_orm_pg_core.PgCustomColumnBuilder<{
        name: "";
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: string;
        driverParam: unknown;
        enumValues: undefined;
    }>;
    <TName extends string>(dbName: TName, fieldConfig?: unknown): drizzle_orm_pg_core.PgCustomColumnBuilder<{
        name: TName;
        dataType: "custom";
        columnType: "PgCustomColumn";
        data: string;
        driverParam: unknown;
        enumValues: undefined;
    }>;
};
/**
 * Users
 */
declare const users: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "users";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "users";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "users";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "users";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "users";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user: drizzle_orm_pg_core.PgColumn<{
            name: "user";
            tableName: "users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        fullname: drizzle_orm_pg_core.PgColumn<{
            name: "fullname";
            tableName: "users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email_verified: drizzle_orm_pg_core.PgColumn<{
            name: "email_verified";
            tableName: "users";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        homepage: drizzle_orm_pg_core.PgColumn<{
            name: "homepage";
            tableName: "users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        github: drizzle_orm_pg_core.PgColumn<{
            name: "github";
            tableName: "users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        links: drizzle_orm_pg_core.PgColumn<{
            name: "links";
            tableName: "users";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * User Secrets
 */
declare const userSecrets: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "user_secrets";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "user_secrets";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "user_secrets";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "user_secrets";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "user_secrets";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user: drizzle_orm_pg_core.PgColumn<{
            name: "user";
            tableName: "user_secrets";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        hash: drizzle_orm_pg_core.PgColumn<{
            name: "hash";
            tableName: "user_secrets";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        email: drizzle_orm_pg_core.PgColumn<{
            name: "email";
            tableName: "user_secrets";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Roles
 */
declare const roles: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "roles";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "roles";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "roles";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "roles";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "roles";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        role: drizzle_orm_pg_core.PgColumn<{
            name: "role";
            tableName: "roles";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "roles";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Organizations
 */
declare const orgs: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "orgs";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "orgs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "orgs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "orgs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "orgs";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org: drizzle_orm_pg_core.PgColumn<{
            name: "org";
            tableName: "orgs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "orgs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "orgs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        homepage: drizzle_orm_pg_core.PgColumn<{
            name: "homepage";
            tableName: "orgs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        github: drizzle_orm_pg_core.PgColumn<{
            name: "github";
            tableName: "orgs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        links: drizzle_orm_pg_core.PgColumn<{
            name: "links";
            tableName: "orgs";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Organization Members
 */
declare const orgMembers: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "org_members";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "org_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "org_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "org_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "org_members";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "org_members";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user_id: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "org_members";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        role_id: drizzle_orm_pg_core.PgColumn<{
            name: "role_id";
            tableName: "org_members";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Teams
 */
declare const teams: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "teams";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "teams";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "teams";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "teams";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "teams";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "teams";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        team: drizzle_orm_pg_core.PgColumn<{
            name: "team";
            tableName: "teams";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "teams";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Team Members
 */
declare const teamMembers: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "team_members";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "team_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "team_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "team_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "team_members";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "team_members";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        team_id: drizzle_orm_pg_core.PgColumn<{
            name: "team_id";
            tableName: "team_members";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user_id: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "team_members";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Secrets
 */
declare const secrets: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "secrets";
    schema: undefined;
    columns: {
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "secrets";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "secrets";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "secrets";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        value: drizzle_orm_pg_core.PgColumn<{
            name: "value";
            tableName: "secrets";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Tokens
 */
declare const tokens: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "tokens";
    schema: undefined;
    columns: {
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "tokens";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "tokens";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "tokens";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user: drizzle_orm_pg_core.PgColumn<{
            name: "user";
            tableName: "tokens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        key: drizzle_orm_pg_core.PgColumn<{
            name: "key";
            tableName: "tokens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        token: drizzle_orm_pg_core.PgColumn<{
            name: "token";
            tableName: "tokens";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        cidr: drizzle_orm_pg_core.PgColumn<{
            name: "cidr";
            tableName: "tokens";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: drizzle_orm.Column<{
                name: "";
                tableName: "tokens";
                dataType: "string";
                columnType: "PgText";
                data: string;
                driverParam: string;
                notNull: false;
                hasDefault: false;
                isPrimaryKey: false;
                isAutoincrement: false;
                hasRuntimeDefault: false;
                enumValues: [string, ...string[]];
                baseColumn: never;
                identity: undefined;
                generated: undefined;
            }, {}, {}>;
            identity: undefined;
            generated: undefined;
        }, {}, {
            baseBuilder: drizzle_orm_pg_core.PgColumnBuilder<{
                name: "";
                dataType: "string";
                columnType: "PgText";
                data: string;
                enumValues: [string, ...string[]];
                driverParam: string;
            }, {}, {}, drizzle_orm.ColumnBuilderExtraConfig>;
            size: undefined;
        }>;
        readonly: drizzle_orm_pg_core.PgColumn<{
            name: "readonly";
            tableName: "tokens";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Local Packages
 */
declare const localPackages: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "local_packages";
    schema: undefined;
    columns: {
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "local_packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "local_packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "local_packages";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "local_packages";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "local_packages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Packages
 */
declare const packages: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "packages";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "packages";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "packages";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "packages";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        json: drizzle_orm_pg_core.PgColumn<{
            name: "json";
            tableName: "packages";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Team Packages
 */
declare const teamPackages: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "team_packages";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "team_packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "team_packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "team_packages";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "team_packages";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "team_packages";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        team_id: drizzle_orm_pg_core.PgColumn<{
            name: "team_id";
            tableName: "team_packages";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        package_id: drizzle_orm_pg_core.PgColumn<{
            name: "package_id";
            tableName: "team_packages";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        permission: drizzle_orm_pg_core.PgColumn<{
            name: "permission";
            tableName: "team_packages";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["r", "w"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: string;
        }>;
    };
    dialect: "pg";
}>;
/**
 * Readmes
 */
declare const readmes: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "readmes";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "readmes";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "readmes";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "readmes";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "readmes";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "readmes";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "readmes";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        version: drizzle_orm_pg_core.PgColumn<{
            name: "version";
            tableName: "readmes";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        markdown: drizzle_orm_pg_core.PgColumn<{
            name: "markdown";
            tableName: "readmes";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        search_english: drizzle_orm_pg_core.PgColumn<{
            name: "search_english";
            tableName: "readmes";
            dataType: "custom";
            columnType: "PgCustomColumn";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: {
                type: "always";
            };
        }, {}, {
            pgColumnBuilderBrand: "PgCustomColumnBuilderBrand";
        }>;
        search_german: drizzle_orm_pg_core.PgColumn<{
            name: "search_german";
            tableName: "readmes";
            dataType: "custom";
            columnType: "PgCustomColumn";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: {
                type: "always";
            };
        }, {}, {
            pgColumnBuilderBrand: "PgCustomColumnBuilderBrand";
        }>;
    };
    dialect: "pg";
}>;
/**
 * Metadata
 */
declare const metadata: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "metadata";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "metadata";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "metadata";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "metadata";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "metadata";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "metadata";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "metadata";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        version: drizzle_orm_pg_core.PgColumn<{
            name: "version";
            tableName: "metadata";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: drizzle_orm_pg_core.PgColumn<{
            name: "description";
            tableName: "metadata";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        keywords: drizzle_orm_pg_core.PgColumn<{
            name: "keywords";
            tableName: "metadata";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        search_english: drizzle_orm_pg_core.PgColumn<{
            name: "search_english";
            tableName: "metadata";
            dataType: "custom";
            columnType: "PgCustomColumn";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: {
                type: "always";
            };
        }, {}, {
            pgColumnBuilderBrand: "PgCustomColumnBuilderBrand";
        }>;
        search_german: drizzle_orm_pg_core.PgColumn<{
            name: "search_german";
            tableName: "metadata";
            dataType: "custom";
            columnType: "PgCustomColumn";
            data: string;
            driverParam: unknown;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: {
                type: "always";
            };
        }, {}, {
            pgColumnBuilderBrand: "PgCustomColumnBuilderBrand";
        }>;
    };
    dialect: "pg";
}>;
/**
 * Dist Tags
 */
declare const distTags: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "dist_tags";
    schema: undefined;
    columns: {
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "dist_tags";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "dist_tags";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "dist_tags";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "dist_tags";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "dist_tags";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        tag: drizzle_orm_pg_core.PgColumn<{
            name: "tag";
            tableName: "dist_tags";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        version: drizzle_orm_pg_core.PgColumn<{
            name: "version";
            tableName: "dist_tags";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Tarballs
 */
declare const tarballs: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "tarballs";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "tarballs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "tarballs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "tarballs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "tarballs";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "tarballs";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "tarballs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        version: drizzle_orm_pg_core.PgColumn<{
            name: "version";
            tableName: "tarballs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        filename: drizzle_orm_pg_core.PgColumn<{
            name: "filename";
            tableName: "tarballs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        data: drizzle_orm_pg_core.PgColumn<{
            name: "data";
            tableName: "tarballs";
            dataType: "custom";
            columnType: "PgCustomColumn";
            data: Buffer<ArrayBufferLike>;
            driverParam: unknown;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            pgColumnBuilderBrand: "PgCustomColumnBuilderBrand";
        }>;
        size: drizzle_orm_pg_core.PgColumn<{
            name: "size";
            tableName: "tarballs";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Downloads
 */
declare const downloads: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "downloads";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "downloads";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "downloads";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        timeslice: drizzle_orm_pg_core.PgColumn<{
            name: "timeslice";
            tableName: "downloads";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["d", "m", "y", "t"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: string;
        }>;
        year: drizzle_orm_pg_core.PgColumn<{
            name: "year";
            tableName: "downloads";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        month: drizzle_orm_pg_core.PgColumn<{
            name: "month";
            tableName: "downloads";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        date: drizzle_orm_pg_core.PgColumn<{
            name: "date";
            tableName: "downloads";
            dataType: "string";
            columnType: "PgDateString";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "downloads";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        version: drizzle_orm_pg_core.PgColumn<{
            name: "version";
            tableName: "downloads";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        count: drizzle_orm_pg_core.PgColumn<{
            name: "count";
            tableName: "downloads";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Events
 */
declare const events: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "events";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "events";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        event: drizzle_orm_pg_core.PgColumn<{
            name: "event";
            tableName: "events";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Event Log
 */
declare const eventLog: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "event_log";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "event_log";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "event_log";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        timestamp: drizzle_orm_pg_core.PgColumn<{
            name: "timestamp";
            tableName: "event_log";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user_id: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "event_log";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        method: drizzle_orm_pg_core.PgColumn<{
            name: "method";
            tableName: "event_log";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "delete" | "get" | "post" | "put";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["get", "post", "put", "delete"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        event_id: drizzle_orm_pg_core.PgColumn<{
            name: "event_id";
            tableName: "event_log";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "event_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        version: drizzle_orm_pg_core.PgColumn<{
            name: "version";
            tableName: "event_log";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
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
declare const clerkUsers: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "clerk_users";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "clerk_users";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "clerk_users";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "clerk_users";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        clerk_user: drizzle_orm_pg_core.PgColumn<{
            name: "clerk_user";
            tableName: "clerk_users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        clerk_json: drizzle_orm_pg_core.PgColumn<{
            name: "clerk_json";
            tableName: "clerk_users";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user_id: drizzle_orm_pg_core.PgColumn<{
            name: "user_id";
            tableName: "clerk_users";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        user: drizzle_orm_pg_core.PgColumn<{
            name: "user";
            tableName: "clerk_users";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Clerk Organizations
 */
declare const clerkOrgs: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "clerk_orgs";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "clerk_orgs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "clerk_orgs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "clerk_orgs";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        clerk_org: drizzle_orm_pg_core.PgColumn<{
            name: "clerk_org";
            tableName: "clerk_orgs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        clerk_json: drizzle_orm_pg_core.PgColumn<{
            name: "clerk_json";
            tableName: "clerk_orgs";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "clerk_orgs";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org: drizzle_orm_pg_core.PgColumn<{
            name: "org";
            tableName: "clerk_orgs";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Clerk Organization Members
 */
declare const clerkMembers: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "clerk_members";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "clerk_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "clerk_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "clerk_members";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        clerk_member: drizzle_orm_pg_core.PgColumn<{
            name: "clerk_member";
            tableName: "clerk_members";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        clerk_json: drizzle_orm_pg_core.PgColumn<{
            name: "clerk_json";
            tableName: "clerk_members";
            dataType: "json";
            columnType: "PgJsonb";
            data: unknown;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        clerk_org: drizzle_orm_pg_core.PgColumn<{
            name: "clerk_org";
            tableName: "clerk_members";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        clerk_user: drizzle_orm_pg_core.PgColumn<{
            name: "clerk_user";
            tableName: "clerk_members";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        role: drizzle_orm_pg_core.PgColumn<{
            name: "role";
            tableName: "clerk_members";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Global Object Directory (GTADIR)
 */
declare const gtadir: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "gtadir";
    schema: undefined;
    columns: {
        deleted: drizzle_orm_pg_core.PgColumn<{
            name: "deleted";
            tableName: "gtadir";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        created: drizzle_orm_pg_core.PgColumn<{
            name: "created";
            tableName: "gtadir";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updated: drizzle_orm_pg_core.PgColumn<{
            name: "updated";
            tableName: "gtadir";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "gtadir";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        pgmid: drizzle_orm_pg_core.PgColumn<{
            name: "pgmid";
            tableName: "gtadir";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        object: drizzle_orm_pg_core.PgColumn<{
            name: "object";
            tableName: "gtadir";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        object_name: drizzle_orm_pg_core.PgColumn<{
            name: "object_name";
            tableName: "gtadir";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        org_id: drizzle_orm_pg_core.PgColumn<{
            name: "org_id";
            tableName: "gtadir";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: drizzle_orm_pg_core.PgColumn<{
            name: "name";
            tableName: "gtadir";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        version: drizzle_orm_pg_core.PgColumn<{
            name: "version";
            tableName: "gtadir";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
/**
 * Boilerplate Counter for Testing
 */
declare const counterSchema: drizzle_orm_pg_core.PgTableWithColumns<{
    name: "counter";
    schema: undefined;
    columns: {
        id: drizzle_orm_pg_core.PgColumn<{
            name: "id";
            tableName: "counter";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        count: drizzle_orm_pg_core.PgColumn<{
            name: "count";
            tableName: "counter";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        updatedAt: drizzle_orm_pg_core.PgColumn<{
            name: "updated_at";
            tableName: "counter";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: drizzle_orm_pg_core.PgColumn<{
            name: "created_at";
            tableName: "counter";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;

type Downloads = {
    date: string;
    count: number;
};
type DownloadsByVersion = {
    version: string;
    count: number;
};
declare class DownloadsService {
    private db;
    private logger;
    constructor(database: Database, logger: Logger);
    increment(filename: string): Promise<void>;
    getDownloads(timeslice: string, start: string, end?: string): Promise<Downloads[] | null>;
    getByPackage(packageName: string, start: string, end?: string): Promise<Downloads[] | null>;
    getByVersion(packageName: string, start: string, end?: string): Promise<DownloadsByVersion[] | null>;
}

declare const ANONYMOUS_USER = "#";
type Method = 'get' | 'post' | 'put' | 'delete';
declare class EventLogService {
    private db;
    private logger;
    private tenant;
    private eventCache;
    private userCache;
    constructor(database: Database, logger: Logger);
    log(user: string, method: Method, event: string, name: string, version?: string): Promise<void>;
    private getUserId;
    private getEventId;
}

type NameVersion = {
    name: string;
    version: string;
};
declare class GlobalTadirService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger);
    exists(tadir: string[]): Promise<boolean>;
    check(tadir: string[]): Promise<NameVersion[]>;
    add(name: string, version: string, tadir: string[]): Promise<void>;
    remove(name: string, version: string): Promise<void>;
    get(name: string, version?: string): Promise<string[]>;
    clean(): Promise<void>;
}

declare class LocalPackagesService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger);
    add(name: string): Promise<void>;
    remove(name: string): Promise<void>;
    get(): Promise<string[]>;
    clean(): Promise<void>;
}

type readmeVersion = {
    version: string;
    markdown: string;
};
declare const getReadmesFromManifest: (manifest: Manifest) => readmeVersion[];
declare const clearReadmesFromManifest: (manifest: Manifest) => Manifest;
declare const mergeReadmesIntoManifest: (manifest: Manifest, readmes: readmeVersion[]) => Manifest;
type metadataVersion = {
    version: string;
    description: string;
    keywords: string;
};
declare const getMetadataFromManifest: (manifest: Manifest) => metadataVersion[];

declare const PUBLIC_PACKAGES = "@";
declare class OrgService {
    private db;
    private logger;
    private orgCache;
    constructor(database: Database, logger: Logger);
    getOrgId(name: string): Promise<number>;
    getOrgIdfromPackage(name: string): Promise<number>;
}

type DistTagsList = {
    [name: string]: {
        [tag: string]: string;
    };
};
declare class PackageService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger);
    exists(name: string): Promise<boolean>;
    create(name: string, manifest: Manifest): Promise<void>;
    read(name: string, noThrow?: boolean): Promise<Manifest>;
    save(name: string, manifest: Manifest): Promise<void>;
    update(name: string, handleUpdate: Callback): Promise<Manifest>;
    delete(name: string): Promise<void>;
    static search(db: Database, query: searchUtils.SearchQuery): Promise<searchUtils.SearchItemPkg[]>;
    getDistTags(names: string[]): Promise<DistTagsList>;
}

declare class TarballService {
    private db;
    private logger;
    private tenant;
    constructor(database: Database, logger: Logger);
    exists(packageName: string, fileName: string): Promise<boolean>;
    read(packageName: string, fileName: string, { signal }: {
        signal: AbortSignal;
    }): Promise<Readable>;
    write(packageName: string, fileName: string, { signal }: {
        signal: AbortSignal;
    }): Promise<Writable>;
    delete(packageName: string, fileName: string): Promise<void>;
    remove(packageName: string): Promise<void>;
}

declare class TenantService {
    private org;
    constructor(database: Database, logger: Logger);
    get(name: string): Promise<number>;
}

interface Token {
    user: string;
    token: string;
    key: string;
    cidr?: string[] | null;
    readonly: boolean;
    created: Date;
    updated?: Date;
}
declare class TokenService {
    private db;
    private logger;
    constructor(database: Database, logger: Logger);
    read({ user }: TokenFilter): Promise<Token$1[]>;
    save(token: Token$1): Promise<void>;
    delete(user: string, key: string): Promise<void>;
    private static toVerdaccioToken;
    private static fromVerdaccioToken;
}

declare class UserSecretsService {
    private db;
    private logger;
    constructor(database: Database, logger: Logger);
    count(): Promise<number>;
    add(user: string, hash: string, email: string): Promise<void>;
    remove(user: string): Promise<void>;
    getHash(user: string): Promise<string | null>;
    getEmail(user: string): Promise<string | null>;
    changePassword(user: string, hash: string): Promise<void>;
    changeEmail(user: string, email: string): Promise<void>;
}

declare const getScopeFromName: (name: string) => string;
declare const getPackageFromName: (name: string) => string;
declare const getNameFromPackageAndScope: (packageName: string, scope: string) => string;
declare const getPackageInfoFromFilename: (filename: string) => {
    name: string;
    version: string;
};
declare const getISODate: (date: string) => string;
declare const getISODates: (start: string, end?: string) => string[];
declare const unescapeHtmlEntities: (json: string) => string;

declare class VerdaccioSecretService {
    private db;
    private logger;
    constructor(database: Database, logger: Logger);
    set(secret: string): Promise<string>;
    get(): Promise<string>;
}

export { ANONYMOUS_USER, type Database, type DistTagsList, type Downloads, type DownloadsByVersion, DownloadsService, ENV, EventLogService, GlobalTadirService, LocalPackagesService, type Method, OrgService, PUBLIC_PACKAGES, PackageService, TarballService, TenantService, type Token, TokenService, UserSecretsService, VerdaccioSecretService, bytea, clearReadmesFromManifest, clerkMembers, clerkOrgs, clerkUsers, counterSchema, distTags, downloads, eventLog, events, getDatabase, getISODate, getISODates, getMetadataFromManifest, getNameFromPackageAndScope, getPackageFromName, getPackageInfoFromFilename, getReadmesFromManifest, getScopeFromName, gtadir, localPackages, loggerFactory, mergeReadmesIntoManifest, metadata, type metadataVersion, methodEnum, orgMembers, orgs, packages, permissionEnum, type readmeVersion, readmes, roles, secrets, tarballs, teamMembers, teamPackages, teams, timesliceEnum, tokens, tsVector, unescapeHtmlEntities, userSecrets, users };
