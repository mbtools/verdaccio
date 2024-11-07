import {
  boolean,
  customType,
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

const timestamps = {
  created: timestamp().defaultNow().notNull(),
  updated: timestamp().defaultNow().notNull(),
};

const timestampsDeleted = {
  ...timestamps,
  deleted: timestamp(),
};

const binary = customType<{
  data: Buffer;
  default: false;
}>({
  dataType() {
    return 'bytea';
  },
});

export const users = pgTable('users', {
  id: serial().notNull().primaryKey().unique(),
  user: text().notNull().unique(),
  name: text().notNull(),
  email: text().notNull(),
  emailVerified: boolean().notNull(),
  ...timestampsDeleted,
});

export const orgs = pgTable('orgs', {
  id: serial().notNull().primaryKey().unique(),
  org: text().notNull().unique(),
  name: text().notNull(),
  ...timestampsDeleted,
});

export const secrets = pgTable('secrets', {
  name: text().notNull().primaryKey().unique(),
  value: text(),
  ...timestamps,
});

export const tokens = pgTable('tokens', {
  user: text().notNull().unique(),
  token: text().notNull(),
  key: text().notNull(),
  cidr: text().array(),
  readonly: boolean().notNull(),
  ...timestamps,
});

export const localPackages = pgTable('local_packages', {
  id: serial().notNull().primaryKey().unique(),
  orgId: integer().references(() => orgs.id),
  name: text().notNull().unique(),
  ...timestamps,
});

export const packages = pgTable(
  'packages',
  {
    id: serial().notNull().primaryKey().unique(),
    orgId: integer().references(() => orgs.id),
    storage: text().notNull(),
    name: text().notNull(),
    json: jsonb().notNull(),
    ...timestamps,
  },
  (table) => [uniqueIndex().on(table.storage, table.name)]
);

export const tarballs = pgTable(
  'tarballs',
  {
    id: serial().notNull().primaryKey().unique(),
    orgId: integer().references(() => orgs.id),
    storage: text().notNull(),
    name: text().notNull(),
    version: text().notNull(),
    filename: text().notNull(),
    data: binary().notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex().on(table.storage, table.name, table.version),
    index().on(table.filename),
  ]
);
