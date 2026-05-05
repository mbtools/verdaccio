"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ANONYMOUS_USER: () => ANONYMOUS_USER,
  DownloadsService: () => DownloadsService,
  ENV: () => ENV,
  EventLogService: () => EventLogService,
  GlobalTadirService: () => GlobalTadirService,
  LocalPackagesService: () => LocalPackagesService,
  OrgService: () => OrgService,
  PUBLIC_PACKAGES: () => PUBLIC_PACKAGES,
  PackageService: () => PackageService,
  TarballService: () => TarballService,
  TenantService: () => TenantService,
  TokenService: () => TokenService,
  UserSecretsService: () => UserSecretsService,
  VerdaccioSecretService: () => VerdaccioSecretService,
  bytea: () => bytea,
  clearReadmesFromManifest: () => clearReadmesFromManifest,
  clerkMembers: () => clerkMembers,
  clerkOrgs: () => clerkOrgs,
  clerkUsers: () => clerkUsers,
  counterSchema: () => counterSchema,
  distTags: () => distTags,
  downloads: () => downloads,
  eventLog: () => eventLog,
  events: () => events,
  getDatabase: () => getDatabase,
  getISODate: () => getISODate,
  getISODates: () => getISODates,
  getMetadataFromManifest: () => getMetadataFromManifest,
  getNameFromPackageAndScope: () => getNameFromPackageAndScope,
  getPackageFromName: () => getPackageFromName,
  getPackageInfoFromFilename: () => getPackageInfoFromFilename,
  getReadmesFromManifest: () => getReadmesFromManifest,
  getScopeFromName: () => getScopeFromName,
  gtadir: () => gtadir,
  localPackages: () => localPackages,
  loggerFactory: () => loggerFactory,
  mergeReadmesIntoManifest: () => mergeReadmesIntoManifest,
  metadata: () => metadata,
  methodEnum: () => methodEnum,
  orgMembers: () => orgMembers,
  orgs: () => orgs,
  packages: () => packages,
  permissionEnum: () => permissionEnum,
  readmes: () => readmes,
  roles: () => roles,
  secrets: () => secrets,
  tarballs: () => tarballs,
  teamMembers: () => teamMembers,
  teamPackages: () => teamPackages,
  teams: () => teams,
  timesliceEnum: () => timesliceEnum,
  tokens: () => tokens,
  tsVector: () => tsVector,
  unescapeHtmlEntities: () => unescapeHtmlEntities,
  userSecrets: () => userSecrets,
  users: () => users
});
module.exports = __toCommonJS(index_exports);

// src/db/index.ts
var import_node_fs = require("fs");
var import_node_path = require("path");
var import_node_postgres = require("drizzle-orm/node-postgres");

// src/env.ts
var import_dotenv = require("dotenv");
var import_zod = __toESM(require("zod"));
var stringBoolean = import_zod.default.coerce.string().transform((val) => {
  return val === "true";
}).default(false);
var envSchema = import_zod.default.object({
  NODE_ENV: import_zod.default.string().default("development"),
  DATABASE_SECRET: import_zod.default.string().trim().min(1).default("caramelicecream"),
  DATABASE_URL: import_zod.default.string().trim().min(1).default("localhost"),
  DB_POOL_SIZE: import_zod.default.coerce.number().default(22),
  DB_SSL: stringBoolean.default(true),
  DB_SSL_REJECT_UNAUTHORIZED: stringBoolean.default(false),
  DB_SSL_CA_PATH: import_zod.default.string().trim().optional(),
  DB_SSL_CERT_PATH: import_zod.default.string().trim().optional(),
  DB_SSL_KEY_PATH: import_zod.default.string().trim().optional(),
  DB_SSL_CA: import_zod.default.string().trim().optional(),
  DB_SSL_CERT: import_zod.default.string().trim().optional(),
  DB_SSL_KEY: import_zod.default.string().trim().optional(),
  DB_LOGGING: stringBoolean.default(false),
  DB_MIGRATING: stringBoolean.default(false),
  DB_SEEDING: stringBoolean.default(false),
  DB_RESET: stringBoolean.default(false),
  DB_FALLBACK: stringBoolean.default(false),
  DB_SALT: import_zod.default.string().default("saltypretzel")
});
(0, import_dotenv.config)({ debug: false, quiet: true });
var envServer = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_SECRET: process.env.DATABASE_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  DB_POOL_SIZE: process.env.DB_POOL_SIZE,
  DB_SSL: process.env.DB_SSL,
  DB_SSL_REJECT_UNAUTHORIZED: process.env.DB_SSL_REJECT_UNAUTHORIZED,
  DB_SSL_CA_PATH: process.env.DB_SSL_CA_PATH,
  DB_SSL_CERT_PATH: process.env.DB_SSL_CERT_PATH,
  DB_SSL_KEY_PATH: process.env.DB_SSL_KEY_PATH,
  DB_SSL_CA: process.env.DB_SSL_CA,
  DB_SSL_CERT: process.env.DB_SSL_CERT,
  DB_SSL_KEY: process.env.DB_SSL_KEY,
  DB_LOGGING: process.env.DB_LOGGING,
  DB_MIGRATING: process.env.DB_MIGRATING,
  DB_SEEDING: process.env.DB_SEEDING,
  DB_RESET: process.env.DB_RESET,
  DB_FALLBACK: process.env.DB_FALLBACK,
  DB_SALT: process.env.DB_SALT
});
if (!envServer.success) {
  throw new Error(envServer.error.message);
}
var ENV = envSchema.parse(process.env);

// src/db/logger.ts
var import_logger = require("drizzle-orm/logger");

// src/db/tools/colors.ts
var RED = "\x1B[31m";
var GREEN = "\x1B[32m";
var YELLOW = "\x1B[33m";
var BLUE = "\x1B[34m";
var MAGENTA = "\x1B[35m";
var CYAN = "\x1B[36m";
var RESET = "\x1B[0m";

// src/db/logger.ts
var VerdaccioLogWriter = class {
  constructor(logger) {
    this.logger = logger;
  }
  write(message) {
    let msg = message.replace(/^Query:\s*/i, "");
    if (msg.length > 500) {
      msg = msg.substring(0, 497) + "...";
    }
    if (msg.includes("users") || msg.includes("user_secrets") || msg.includes("secrets") || msg.includes("tokens")) {
      msg = msg.split(" ")[0] + "<Classified>";
    }
    const coloredMsg = msg.replace(/^(\w+)/i, (_, word) => {
      const lword = word.toLowerCase();
      const colors = {
        select: CYAN,
        insert: BLUE,
        update: GREEN,
        delete: MAGENTA,
        truncate: RED
      };
      const color = colors[lword];
      return `${color || YELLOW}${word}${RESET}`;
    });
    this.logger.info(`SQL: ${coloredMsg}`);
  }
};
var loggerFactory = (logger) => {
  return logger ? new import_logger.DefaultLogger({ writer: new VerdaccioLogWriter(logger) }) : void 0;
};

// src/db/index.ts
var getDatabase = (url, logger) => {
  const drizzleLogger = loggerFactory(logger);
  const sslConfig = ENV.DB_SSL ? {
    rejectUnauthorized: ENV.DB_SSL_REJECT_UNAUTHORIZED,
    ca: ENV.DB_SSL_CA_PATH ? (0, import_node_fs.readFileSync)((0, import_node_path.resolve)(ENV.DB_SSL_CA_PATH), "utf8") : ENV.DB_SSL_CA ?? void 0,
    cert: ENV.DB_SSL_CERT_PATH ? (0, import_node_fs.readFileSync)((0, import_node_path.resolve)(ENV.DB_SSL_CERT_PATH), "utf8") : ENV.DB_SSL_CERT ?? void 0,
    key: ENV.DB_SSL_KEY_PATH ? (0, import_node_fs.readFileSync)((0, import_node_path.resolve)(ENV.DB_SSL_KEY_PATH), "utf8") : ENV.DB_SSL_KEY ?? void 0
  } : false;
  const isSingleConnection = ENV.DATABASE_URL.includes("localhost") || ENV.DATABASE_URL.includes("127.0.0.1") || ENV.DATABASE_URL.includes("file:") || ENV.DB_MIGRATING || ENV.DB_SEEDING || ENV.DB_RESET;
  const db = (0, import_node_postgres.drizzle)({
    connection: {
      connectionString: url,
      max: isSingleConnection ? 1 : ENV.DB_POOL_SIZE,
      ssl: sslConfig
    },
    logger: drizzleLogger
  });
  return db;
};

// src/db/schema/index.ts
var import_drizzle_orm = require("drizzle-orm");
var import_pg_core = require("drizzle-orm/pg-core");
var timestamps = {
  created: (0, import_pg_core.timestamp)().defaultNow().notNull(),
  updated: (0, import_pg_core.timestamp)().defaultNow().notNull()
};
var timestampsDeleted = {
  ...timestamps,
  deleted: (0, import_pg_core.timestamp)()
};
var permissionEnum = (0, import_pg_core.pgEnum)("permissions", ["r", "w"]);
var timesliceEnum = (0, import_pg_core.pgEnum)("timeslices", ["d", "m", "y", "t"]);
var methodEnum = (0, import_pg_core.pgEnum)("methods", ["get", "post", "put", "delete"]);
var bytea = (0, import_pg_core.customType)({
  dataType() {
    return "bytea";
  },
  toDriver(value) {
    if (!(value instanceof Buffer)) {
      throw new TypeError(`Value of type ${typeof value} is not a Buffer`);
    }
    return import_drizzle_orm.sql`decode(${value.toString("hex")}, 'hex')`;
  },
  fromDriver(value) {
    if (value instanceof Buffer) {
      return value;
    }
    if (typeof value === "string") {
      const HEX_ESCAPE_REGEX = /\\x/g;
      return Buffer.from(value.replace(HEX_ESCAPE_REGEX, ""), "hex");
    }
    throw new Error(`Cannot convert value of type ${typeof value} to a Buffer`);
  }
});
var tsVector = (0, import_pg_core.customType)({
  dataType() {
    return "tsvector";
  },
  fromDriver(value) {
    return value;
  }
});
var users = (0, import_pg_core.pgTable)("users", {
  id: (0, import_pg_core.serial)().unique(),
  // user slug: mbtools
  user: (0, import_pg_core.text)().primaryKey(),
  // Marc Bernard
  fullname: (0, import_pg_core.text)(),
  // I build awesome open-source tools for SAP customers, partners, and developers
  description: (0, import_pg_core.text)(),
  // mbtools@github.com
  email: (0, import_pg_core.text)(),
  email_verified: (0, import_pg_core.boolean)().notNull().default(false),
  // https://marcf.be
  homepage: (0, import_pg_core.text)(),
  // https://github.com/mbtools
  github: (0, import_pg_core.text)(),
  // Other links
  links: (0, import_pg_core.jsonb)(),
  ...timestampsDeleted
});
var userSecrets = (0, import_pg_core.pgTable)("user_secrets", {
  id: (0, import_pg_core.serial)().unique(),
  user: (0, import_pg_core.text)().primaryKey(),
  hash: (0, import_pg_core.text)().notNull(),
  email: (0, import_pg_core.text)().notNull(),
  ...timestampsDeleted
});
var roles = (0, import_pg_core.pgTable)("roles", {
  id: (0, import_pg_core.serial)().unique(),
  // admin, member, owner
  role: (0, import_pg_core.text)().primaryKey(),
  description: (0, import_pg_core.text)(),
  ...timestampsDeleted
});
var orgs = (0, import_pg_core.pgTable)("orgs", {
  id: (0, import_pg_core.serial)().unique(),
  // org slug: @apm
  org: (0, import_pg_core.text)().primaryKey(),
  // apm.to Inc.
  name: (0, import_pg_core.text)(),
  // We are the company behind apm Package Manager for ABAP 📦, the apm Website 🌐, and the apm Registry 📑
  description: (0, import_pg_core.text)(),
  // https://apm.to
  homepage: (0, import_pg_core.text)(),
  // https://github.com/abappm
  github: (0, import_pg_core.text)(),
  // Other links
  links: (0, import_pg_core.jsonb)(),
  ...timestampsDeleted
});
var orgMembers = (0, import_pg_core.pgTable)(
  "org_members",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    user_id: (0, import_pg_core.integer)().references(() => users.id),
    role_id: (0, import_pg_core.integer)().references(() => roles.id),
    ...timestampsDeleted
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.user_id, t.role_id] })]
);
var teams = (0, import_pg_core.pgTable)(
  "teams",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    team: (0, import_pg_core.text)().notNull(),
    description: (0, import_pg_core.text)(),
    ...timestampsDeleted
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.team] })]
);
var teamMembers = (0, import_pg_core.pgTable)(
  "team_members",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    team_id: (0, import_pg_core.integer)().references(() => teams.id),
    user_id: (0, import_pg_core.integer)().references(() => users.id),
    ...timestampsDeleted
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.team_id, t.user_id] })]
);
var secrets = (0, import_pg_core.pgTable)("secrets", {
  name: (0, import_pg_core.text)().primaryKey(),
  value: (0, import_pg_core.text)().notNull(),
  ...timestamps
});
var tokens = (0, import_pg_core.pgTable)(
  "tokens",
  {
    id: (0, import_pg_core.serial)().unique(),
    user: (0, import_pg_core.text)().notNull(),
    key: (0, import_pg_core.text)().notNull(),
    token: (0, import_pg_core.text)().notNull(),
    cidr: (0, import_pg_core.text)().array(),
    readonly: (0, import_pg_core.boolean)().notNull(),
    ...timestamps
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.user, t.key] })]
);
var localPackages = (0, import_pg_core.pgTable)(
  "local_packages",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    name: (0, import_pg_core.text)().notNull(),
    ...timestamps
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.name] })]
);
var packages = (0, import_pg_core.pgTable)(
  "packages",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    name: (0, import_pg_core.text)().notNull(),
    json: (0, import_pg_core.jsonb)().notNull(),
    ...timestampsDeleted
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.name] })]
);
var teamPackages = (0, import_pg_core.pgTable)(
  "team_packages",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    team_id: (0, import_pg_core.integer)().references(() => teams.id),
    package_id: (0, import_pg_core.integer)().references(() => packages.id),
    permission: permissionEnum().$type(),
    ...timestampsDeleted
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.team_id, t.package_id] })]
);
var readmes = (0, import_pg_core.pgTable)(
  "readmes",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    name: (0, import_pg_core.text)().notNull(),
    version: (0, import_pg_core.text)().notNull(),
    markdown: (0, import_pg_core.text)().notNull(),
    search_english: tsVector().generatedAlwaysAs(
      () => import_drizzle_orm.sql`to_tsvector('english', coalesce(${readmes.markdown}, ''))`
    ),
    search_german: tsVector().generatedAlwaysAs(
      () => import_drizzle_orm.sql`to_tsvector('german', coalesce(${readmes.markdown}, ''))`
    ),
    ...timestampsDeleted
  },
  (t) => [
    (0, import_pg_core.primaryKey)({ columns: [t.org_id, t.name, t.version] }),
    (0, import_pg_core.index)("readme_search_english").using("gin", t.search_english),
    (0, import_pg_core.index)("readme_search_german").using("gin", t.search_german)
  ]
);
var metadata = (0, import_pg_core.pgTable)(
  "metadata",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    name: (0, import_pg_core.text)().notNull(),
    version: (0, import_pg_core.text)().notNull(),
    description: (0, import_pg_core.text)(),
    keywords: (0, import_pg_core.text)(),
    search_english: tsVector().generatedAlwaysAs(
      () => import_drizzle_orm.sql`
      setweight(to_tsvector('english', coalesce(${metadata.name}, '')), 'A') || ' ' ||
      setweight(to_tsvector('english', coalesce(${metadata.version}, '')), 'B') || ' ' ||
      setweight(to_tsvector('english', coalesce(${metadata.description}, '')), 'C') || ' ' ||
      setweight(to_tsvector('english', coalesce(${metadata.keywords}, '')), 'D')`
    ),
    search_german: tsVector().generatedAlwaysAs(
      () => import_drizzle_orm.sql`
      setweight(to_tsvector('german', coalesce(${metadata.name}, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(${metadata.version}, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(${metadata.description}, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(${metadata.keywords}, '')), 'D')`
    ),
    ...timestampsDeleted
  },
  (t) => [
    (0, import_pg_core.primaryKey)({ columns: [t.org_id, t.name, t.version] }),
    (0, import_pg_core.index)("metadata_search_english").using("gin", t.search_english),
    (0, import_pg_core.index)("metadata_search_german").using("gin", t.search_german)
  ]
);
var distTags = (0, import_pg_core.pgTable)(
  "dist_tags",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    name: (0, import_pg_core.text)().notNull(),
    tag: (0, import_pg_core.text)().notNull(),
    version: (0, import_pg_core.text)().notNull(),
    ...timestamps
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.name, t.tag, t.version] })]
);
var tarballs = (0, import_pg_core.pgTable)(
  "tarballs",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    name: (0, import_pg_core.text)().notNull(),
    version: (0, import_pg_core.text)().notNull(),
    filename: (0, import_pg_core.text)().notNull(),
    data: bytea().notNull(),
    size: (0, import_pg_core.integer)().notNull(),
    ...timestampsDeleted
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.name, t.version] })]
);
var downloads = (0, import_pg_core.pgTable)(
  "downloads",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    timeslice: timesliceEnum().notNull().$type(),
    year: (0, import_pg_core.integer)(),
    month: (0, import_pg_core.integer)(),
    date: (0, import_pg_core.date)(),
    name: (0, import_pg_core.text)(),
    version: (0, import_pg_core.text)(),
    count: (0, import_pg_core.integer)().notNull()
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.timeslice, t.year, t.month, t.date, t.name, t.version] })]
);
var events = (0, import_pg_core.pgTable)("events", {
  id: (0, import_pg_core.serial)().unique(),
  event: (0, import_pg_core.text)().notNull()
});
var eventLog = (0, import_pg_core.pgTable)(
  "event_log",
  {
    id: (0, import_pg_core.serial)().unique(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    timestamp: (0, import_pg_core.timestamp)().defaultNow().notNull(),
    user_id: (0, import_pg_core.integer)().references(() => users.id),
    method: methodEnum().notNull(),
    event_id: (0, import_pg_core.integer)().references(() => events.id),
    name: (0, import_pg_core.text)(),
    version: (0, import_pg_core.text)()
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.org_id, t.timestamp, t.user_id] })]
);
var clerkUsers = (0, import_pg_core.pgTable)("clerk_users", {
  // user_29w83sxmDNGwOuEthce5gg56FcC
  clerk_user: (0, import_pg_core.text)().primaryKey(),
  clerk_json: (0, import_pg_core.jsonb)(),
  // user id
  user_id: (0, import_pg_core.integer)().references(() => users.id),
  // user slug: mbtools
  user: (0, import_pg_core.text)().references(() => users.user),
  ...timestampsDeleted
});
var clerkOrgs = (0, import_pg_core.pgTable)("clerk_orgs", {
  // org_29w9IfBrPmcpi0IeBVaKtA7R94W
  clerk_org: (0, import_pg_core.text)().primaryKey(),
  clerk_json: (0, import_pg_core.jsonb)(),
  // org id
  org_id: (0, import_pg_core.integer)().references(() => orgs.id),
  // org slug: @apm
  org: (0, import_pg_core.text)().references(() => orgs.org),
  ...timestampsDeleted
});
var clerkMembers = (0, import_pg_core.pgTable)("clerk_members", {
  // orgmem_29w9IptNja3mP8GDXpquBwN2qR9
  clerk_member: (0, import_pg_core.text)().primaryKey(),
  clerk_json: (0, import_pg_core.jsonb)(),
  // org_29w9IfBrPmcpi0IeBVaKtA7R94W
  clerk_org: (0, import_pg_core.text)().references(() => clerkOrgs.clerk_org),
  // user_29w83sxmDNGwOuEthce5gg56FcC
  clerk_user: (0, import_pg_core.text)().references(() => clerkUsers.clerk_user),
  role: (0, import_pg_core.text)().references(() => roles.role),
  ...timestampsDeleted
});
var gtadir = (0, import_pg_core.pgTable)(
  "gtadir",
  {
    id: (0, import_pg_core.serial)().unique(),
    pgmid: (0, import_pg_core.text)().notNull(),
    object: (0, import_pg_core.text)().notNull(),
    object_name: (0, import_pg_core.text)().notNull(),
    org_id: (0, import_pg_core.integer)().references(() => orgs.id),
    name: (0, import_pg_core.text)().notNull(),
    version: (0, import_pg_core.text)().notNull(),
    ...timestampsDeleted
  },
  (t) => [(0, import_pg_core.primaryKey)({ columns: [t.pgmid, t.object, t.object_name] })]
);
var counterSchema = (0, import_pg_core.pgTable)("counter", {
  id: (0, import_pg_core.serial)("id").primaryKey(),
  count: (0, import_pg_core.integer)("count").default(0),
  updatedAt: (0, import_pg_core.timestamp)("updated_at", { mode: "date" }).defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
  createdAt: (0, import_pg_core.timestamp)("created_at", { mode: "date" }).defaultNow().notNull()
});

// src/services/downloads.ts
var import_debug = __toESM(require("debug"));
var import_drizzle_orm2 = require("drizzle-orm");

// src/services/utils.ts
var getScopeFromName = (name) => {
  return name.startsWith("@") ? name.split("/")[0] : "";
};
var getPackageFromName = (name) => {
  return name.startsWith("@") ? name.split("/")[1] : name;
};
var getNameFromPackageAndScope = (packageName, scope) => {
  return scope.length > 0 ? `${scope}/${packageName}` : packageName;
};
var getPackageInfoFromFilename = (filename) => {
  const match = filename.match(/^(.*)-(\d+\.\d+\.\d+.*)\.tgz$/);
  if (!match) {
    throw new Error(`Invalid tarball filename: ${filename}`);
  }
  return { name: match[1], version: match[2] };
};
var getISODate = (date2) => {
  return new Date(date2).toISOString().split("T")[0];
};
var getISODates = (start, end) => {
  const dates = [];
  dates.push(getISODate(start));
  dates.push(getISODate(end || start));
  return dates;
};
var unescapeHtmlEntities = (json) => {
  return json.replace(/\\u003e/g, ">").replace(/\\u003c/g, "<").replace(/\\u0026/g, "&");
};

// src/services/downloads.ts
var debug = (0, import_debug.default)("verdaccio:plugin:pro:db");
var DownloadsService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
  }
  async increment(filename) {
    const { name, version } = getPackageInfoFromFilename(filename);
    const now = /* @__PURE__ */ new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const today = now.toISOString().split("T")[0];
    const data = [
      {
        timeslice: "d",
        year,
        month,
        date: today,
        name,
        version,
        count: 1
      },
      {
        timeslice: "d",
        year,
        month,
        date: today,
        name: null,
        version: null,
        count: 1
      },
      {
        timeslice: "m",
        year,
        month,
        date: null,
        name: null,
        version: null,
        count: 1
      },
      {
        timeslice: "y",
        year,
        month: null,
        date: null,
        name: null,
        version: null,
        count: 1
      },
      {
        timeslice: "t",
        year: null,
        month: null,
        date: null,
        name: null,
        version: null,
        count: 1
      }
    ];
    try {
      await this.db.insert(downloads).values(data).onConflictDoUpdate({
        target: [downloads.timeslice, downloads.year, downloads.month, downloads.date, downloads.name, downloads.version],
        set: { count: import_drizzle_orm2.sql`${downloads.count} + 1` }
      });
      debug("downloads incremented successfully");
    } catch (error) {
      debug("downloads error: %o", error);
    }
  }
  async getDownloads(timeslice, start, end) {
    const [startDate, endDate] = getISODates(start, end);
    const data = await this.db.select({
      date: downloads.date,
      count: (0, import_drizzle_orm2.sum)(downloads.count)
    }).from(downloads).where((0, import_drizzle_orm2.and)(
      (0, import_drizzle_orm2.eq)(downloads.timeslice, timeslice),
      (0, import_drizzle_orm2.between)(downloads.date, startDate, endDate),
      (0, import_drizzle_orm2.isNull)(downloads.name)
    )).groupBy(downloads.date).orderBy(downloads.date);
    return data.map((d) => ({ date: d.date, count: Number(d.count) }));
  }
  async getByPackage(packageName, start, end) {
    const [startDate, endDate] = getISODates(start, end);
    const data = await this.db.select({
      date: downloads.date,
      count: (0, import_drizzle_orm2.sum)(downloads.count)
    }).from(downloads).where((0, import_drizzle_orm2.and)(
      (0, import_drizzle_orm2.eq)(downloads.timeslice, "d"),
      (0, import_drizzle_orm2.between)(downloads.date, startDate, endDate),
      (0, import_drizzle_orm2.eq)(downloads.name, packageName)
    )).groupBy(downloads.date).orderBy(downloads.date);
    return data.map((d) => ({ date: d.date, count: Number(d.count) }));
  }
  async getByVersion(packageName, start, end) {
    const [startDate, endDate] = getISODates(start, end);
    const data = await this.db.select({
      version: downloads.version,
      count: (0, import_drizzle_orm2.sum)(downloads.count)
    }).from(downloads).where((0, import_drizzle_orm2.and)(
      (0, import_drizzle_orm2.eq)(downloads.timeslice, "d"),
      (0, import_drizzle_orm2.between)(downloads.date, startDate, endDate),
      (0, import_drizzle_orm2.eq)(downloads.name, packageName)
    )).groupBy(downloads.version).orderBy(downloads.version);
    return data.map((d) => ({ version: d.version, count: Number(d.count) }));
  }
};

// src/services/event-log.ts
var import_debug2 = __toESM(require("debug"));
var import_drizzle_orm4 = require("drizzle-orm");
var import_core2 = require("@verdaccio/core");

// src/services/org.ts
var import_drizzle_orm3 = require("drizzle-orm");
var import_core = require("@verdaccio/core");
var PUBLIC_PACKAGES = "@";
var OrgService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
    this.orgCache = /* @__PURE__ */ new Map();
  }
  async getOrgId(name) {
    const [ids] = await this.db.select({ id: orgs.id }).from(orgs).where((0, import_drizzle_orm3.eq)(orgs.org, name));
    if (!ids) {
      throw import_core.errorUtils.getNotFound(`organization "${name}" not found`);
    }
    return ids.id;
  }
  async getOrgIdfromPackage(name) {
    if (this.orgCache.has(name)) {
      return this.orgCache.get(name);
    }
    let orgId;
    if (name.startsWith("@")) {
      orgId = await this.getOrgId(name.split("/")[0]);
    } else {
      orgId = await this.getOrgId(PUBLIC_PACKAGES);
    }
    this.orgCache.set(name, orgId);
    return orgId;
  }
};

// src/services/tenant.ts
var TenantService = class {
  constructor(database, logger) {
    this.org = new OrgService(database, logger);
  }
  async get(name) {
    return await this.org.getOrgIdfromPackage(name);
  }
};

// src/services/event-log.ts
var debug2 = (0, import_debug2.default)("verdaccio:plugin:pro:db");
var ANONYMOUS_USER = "#";
var EventLogService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
    this.tenant = new TenantService(database, logger);
    this.eventCache = /* @__PURE__ */ new Map();
    this.userCache = /* @__PURE__ */ new Map();
  }
  async log(user, method, event, name, version) {
    const org_id = await this.tenant.get(name);
    const data = {
      org_id,
      user_id: await this.getUserId(user),
      method,
      event_id: await this.getEventId(event),
      name,
      version
    };
    try {
      await this.db.insert(eventLog).values(data);
      debug2("activity logged successfully");
    } catch (error) {
      debug2("activity error: %o", error);
    }
  }
  async getUserId(user) {
    if (!user || user === "") {
      return this.getUserId(ANONYMOUS_USER);
    }
    if (this.userCache.has(user)) {
      return this.userCache.get(user);
    }
    const [ids] = await this.db.select({ id: users.id }).from(users).where((0, import_drizzle_orm4.and)((0, import_drizzle_orm4.eq)(users.user, user), (0, import_drizzle_orm4.isNull)(users.deleted)));
    if (!ids) {
      throw import_core2.errorUtils.getNotFound(`user "${user}" not found`);
    }
    const id = ids.id;
    this.userCache.set(user, id);
    return id;
  }
  async getEventId(event) {
    if (this.eventCache.has(event)) {
      return this.eventCache.get(event);
    }
    const [ids] = await this.db.select({ id: events.id }).from(events).where((0, import_drizzle_orm4.eq)(events.event, event));
    if (!ids) {
      throw import_core2.errorUtils.getNotFound(`event "${event}" not found`);
    }
    const id = ids.id;
    this.eventCache.set(event, id);
    return id;
  }
};

// src/services/gtadir.ts
var import_debug3 = __toESM(require("debug"));
var import_drizzle_orm5 = require("drizzle-orm");
var import_core3 = require("@verdaccio/core");
var debug3 = (0, import_debug3.default)("verdaccio:plugin:pro:db");
var GlobalTadirService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
    this.tenant = new TenantService(database, logger);
  }
  async exists(tadir) {
    debug3("check if GTADIR entries exist");
    if (tadir.length === 0) {
      return false;
    }
    const conditions = tadir.map((record) => {
      const [object, object_name] = record.split(",");
      return (0, import_drizzle_orm5.and)(
        (0, import_drizzle_orm5.eq)(gtadir.pgmid, "R3TR"),
        (0, import_drizzle_orm5.eq)(gtadir.object, object),
        (0, import_drizzle_orm5.eq)(gtadir.object_name, object_name),
        (0, import_drizzle_orm5.isNull)(gtadir.deleted)
      );
    });
    const existing = await this.db.select({ id: gtadir.id }).from(gtadir).where((0, import_drizzle_orm5.or)(...conditions)).limit(1);
    debug3("Existing GTADIR entries: %o", existing.length);
    return existing.length > 0;
  }
  async check(tadir) {
    debug3("check GTADIR entries and return names and versions");
    if (tadir.length === 0) {
      return [];
    }
    const conditions = tadir.map((record) => {
      const [object, object_name] = record.split(",");
      return (0, import_drizzle_orm5.and)(
        (0, import_drizzle_orm5.eq)(gtadir.pgmid, "R3TR"),
        (0, import_drizzle_orm5.eq)(gtadir.object, object),
        (0, import_drizzle_orm5.eq)(gtadir.object_name, object_name),
        (0, import_drizzle_orm5.isNull)(gtadir.deleted)
      );
    });
    const results = await this.db.selectDistinct({ name: gtadir.name, version: gtadir.version }).from(gtadir).where((0, import_drizzle_orm5.or)(...conditions));
    debug3("Found GTADIR entries: %o", results.length);
    return results;
  }
  async add(name, version, tadir) {
    debug3("add GTADIR %o %o, records %o", name, version, tadir.length);
    if (await this.exists(tadir)) {
      throw import_core3.errorUtils.getInternalError(`Objects already exist in GTADIR database`);
    }
    const org_id = await this.tenant.get(name);
    const tadirData = tadir.map((record) => {
      const [object, object_name] = record.split(",");
      return {
        pgmid: "R3TR",
        object,
        object_name,
        org_id,
        name,
        version,
        created: /* @__PURE__ */ new Date(),
        updated: /* @__PURE__ */ new Date(),
        deleted: null
      };
    });
    try {
      await this.db.insert(gtadir).values(tadirData);
      debug3("GTADIR %o has been added", name);
    } catch (error) {
      debug3("upsert error: %o", error);
      throw import_core3.errorUtils.getInternalError(`Error adding GTADIR: ${error}`);
    }
  }
  async remove(name, version) {
    debug3("remove GTADIR %o, version %o", name, version);
    const org_id = await this.tenant.get(name);
    try {
      await this.db.delete(gtadir).where((0, import_drizzle_orm5.and)((0, import_drizzle_orm5.eq)(gtadir.org_id, org_id), (0, import_drizzle_orm5.eq)(gtadir.name, name), (0, import_drizzle_orm5.eq)(gtadir.version, version)));
      debug3("GTADIR %o, version %o has been removed", name, version);
    } catch (error) {
      debug3("delete error: %o", error);
      throw import_core3.errorUtils.getInternalError(`Error deleting GTADIR: ${error}`);
    }
  }
  async get(name, version) {
    debug3("get object list of package");
    const org_id = await this.tenant.get(name);
    const objects = await this.db.select({ pgmid: gtadir.pgmid, object: gtadir.object, object_name: gtadir.object_name }).from(gtadir).where((0, import_drizzle_orm5.and)(
      (0, import_drizzle_orm5.eq)(gtadir.org_id, org_id),
      (0, import_drizzle_orm5.eq)(gtadir.name, name),
      version ? (0, import_drizzle_orm5.eq)(gtadir.version, version) : void 0,
      (0, import_drizzle_orm5.isNull)(gtadir.deleted)
    )).orderBy(gtadir.name);
    debug3("list of %o objects has been fetched", objects ? objects.length : 0);
    return objects.map((row) => `${row.pgmid},${row.object},${row.object_name}`);
  }
  async clean() {
    debug3("clean all GTADIR");
    await this.db.execute(import_drizzle_orm5.sql`TRUNCATE TABLE gtadir`);
  }
};

// src/services/local-package.ts
var import_debug4 = __toESM(require("debug"));
var import_drizzle_orm6 = require("drizzle-orm");
var import_core4 = require("@verdaccio/core");
var debug4 = (0, import_debug4.default)("verdaccio:plugin:pro:db");
var LocalPackagesService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
    this.tenant = new TenantService(database, logger);
  }
  async add(name) {
    debug4("add local package %o", name);
    const org_id = await this.tenant.get(name);
    try {
      await this.db.insert(localPackages).values({ org_id, name }).onConflictDoUpdate({
        target: [localPackages.org_id, localPackages.name],
        set: { updated: /* @__PURE__ */ new Date() }
      });
      debug4("package %o has been added", name);
    } catch (error) {
      debug4("upsert error: %o", error);
      throw import_core4.errorUtils.getInternalError(`Error adding local package: ${error}`);
    }
  }
  async remove(name) {
    debug4("remove local package %o", name);
    const org_id = await this.tenant.get(name);
    try {
      await this.db.delete(localPackages).where((0, import_drizzle_orm6.and)((0, import_drizzle_orm6.eq)(localPackages.org_id, org_id), (0, import_drizzle_orm6.eq)(localPackages.name, name)));
      debug4("package %o has been removed", name);
    } catch (error) {
      debug4("delete error: %o", error);
      throw import_core4.errorUtils.getInternalError(`Error deleting local package: ${error}`);
    }
  }
  async get() {
    debug4("get full list of package");
    const names = await this.db.select({ name: localPackages.name }).from(localPackages).orderBy(localPackages.name);
    debug4("list of %o packages has been fetched", names ? names.length : 0);
    return names.map((row) => row.name);
  }
  async clean() {
    debug4("clean all local packages");
    await this.db.execute(import_drizzle_orm6.sql`TRUNCATE TABLE local_packages`);
  }
};

// src/services/manifest.ts
var getReadmesFromManifest = (manifest) => {
  const readmes2 = [];
  for (const version in manifest.versions) {
    const readme = manifest.versions[version].readme;
    if (readme) {
      readmes2.push({ version, markdown: readme });
    }
  }
  const latest = manifest.readme;
  if (latest) {
    readmes2.push({ version: "latest", markdown: latest });
  }
  return readmes2;
};
var clearReadmesFromManifest = (manifest) => {
  const manifestCopy = JSON.parse(JSON.stringify(manifest));
  for (const version in manifestCopy.versions) {
    manifestCopy.versions[version].readdown = "";
  }
  manifestCopy.readme = "";
  return manifestCopy;
};
var mergeReadmesIntoManifest = (manifest, readmes2) => {
  const manifestCopy = JSON.parse(JSON.stringify(manifest));
  for (const readme of readmes2) {
    if (readme.version === "latest") {
      manifestCopy.readme = readme.markdown;
    } else if (manifestCopy.versions[readme.version]) {
      manifestCopy.versions[readme.version].readme = readme.markdown;
    }
  }
  return manifestCopy;
};
var getMetadataFromManifest = (manifest) => {
  const metadata2 = [];
  for (const version in manifest.versions) {
    const packageVersion = manifest.versions[version];
    const description = packageVersion.description || "";
    const keywords = Array.isArray(packageVersion.keywords) ? packageVersion.keywords.join(" ") : packageVersion.keywords || "";
    metadata2.push({ version, description, keywords });
  }
  return metadata2;
};

// src/services/package.ts
var import_debug5 = __toESM(require("debug"));
var import_drizzle_orm7 = require("drizzle-orm");
var import_core5 = require("@verdaccio/core");
var debug5 = (0, import_debug5.default)("verdaccio:plugin:pro:db");
var PackageService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
    this.tenant = new TenantService(database, logger);
  }
  async exists(name) {
    const org_id = await this.tenant.get(name);
    const count = await this.db.$count(
      packages,
      (0, import_drizzle_orm7.and)(
        (0, import_drizzle_orm7.eq)(packages.org_id, org_id),
        (0, import_drizzle_orm7.eq)(packages.name, name),
        (0, import_drizzle_orm7.isNull)(packages.deleted)
      )
    );
    const exists = count > 0;
    debug5("package exists: %o", exists);
    return exists;
  }
  async create(name, manifest) {
    await this.save(name, manifest);
    debug5("package created successfully");
  }
  async read(name, noThrow) {
    const org_id = await this.tenant.get(name);
    const [packageJson] = await this.db.select({ json: packages.json }).from(packages).where((0, import_drizzle_orm7.and)(
      (0, import_drizzle_orm7.eq)(packages.org_id, org_id),
      (0, import_drizzle_orm7.eq)(packages.name, name),
      (0, import_drizzle_orm7.isNull)(packages.deleted)
    ));
    if (!packageJson) {
      if (noThrow) {
        return {};
      }
      throw import_core5.errorUtils.getNotFound("package.json not found");
    }
    const manifest = JSON.parse(unescapeHtmlEntities(JSON.stringify(packageJson.json)));
    const markdown = await this.db.select({ version: readmes.version, markdown: readmes.markdown }).from(readmes).where((0, import_drizzle_orm7.and)(
      (0, import_drizzle_orm7.eq)(readmes.org_id, org_id),
      (0, import_drizzle_orm7.eq)(readmes.name, name),
      (0, import_drizzle_orm7.isNull)(readmes.deleted)
    ));
    const manifestMerged = mergeReadmesIntoManifest(manifest, markdown);
    debug5("package read successfully");
    return manifestMerged;
  }
  async save(name, manifest) {
    const org_id = await this.tenant.get(name);
    await this.db.transaction(async (tx) => {
      const tags = manifest["dist-tags"];
      const distTagsData = Object.entries(tags).map(([tag, version]) => ({
        org_id,
        tag,
        name,
        version
      }));
      try {
        await tx.delete(distTags).where((0, import_drizzle_orm7.and)(
          (0, import_drizzle_orm7.eq)(distTags.org_id, org_id),
          (0, import_drizzle_orm7.eq)(distTags.name, name)
        ));
        debug5("dist-tags deleted successfully");
      } catch (error) {
        debug5("dist-tags delete error: %o", error);
      }
      if (distTagsData && distTagsData.length > 0) {
        try {
          await tx.insert(distTags).values(distTagsData);
          debug5("dist-tags saved successfully");
        } catch (error) {
          debug5("dist-tags insert error: %o", error);
          tx.rollback();
        }
      }
      const markdown = getReadmesFromManifest(manifest);
      const readmesData = markdown.map((row) => ({
        org_id,
        name,
        version: row.version,
        markdown: row.markdown,
        deleted: null
      }));
      if (readmesData && readmesData.length > 0) {
        try {
          await tx.insert(readmes).values(readmesData).onConflictDoUpdate({
            target: [readmes.org_id, readmes.name, readmes.version],
            set: { markdown: import_drizzle_orm7.sql`excluded.markdown`, updated: /* @__PURE__ */ new Date(), deleted: null }
          });
          debug5("readmes saved successfully");
        } catch (error) {
          debug5("readmes error: %o", error);
          tx.rollback();
        }
      }
      const meta = getMetadataFromManifest(manifest);
      const metadataData = meta.map((row) => ({
        org_id,
        name,
        version: row.version,
        description: row.description,
        keywords: row.keywords,
        deleted: null
      }));
      if (metadataData && metadataData.length > 0) {
        try {
          await tx.insert(metadata).values(metadataData).onConflictDoUpdate({
            target: [metadata.org_id, metadata.name, metadata.version],
            set: { description: import_drizzle_orm7.sql`excluded.description`, keywords: import_drizzle_orm7.sql`excluded.keywords`, updated: /* @__PURE__ */ new Date() }
          });
          debug5("package metadata saved successfully");
        } catch (error) {
          debug5("package metadata error: %o", error);
          tx.rollback();
        }
      }
      const manifestClean = clearReadmesFromManifest(manifest);
      try {
        await tx.insert(packages).values({
          org_id,
          name,
          json: manifestClean
        }).onConflictDoUpdate({
          target: [packages.org_id, packages.name],
          set: { json: import_drizzle_orm7.sql`excluded.json`, updated: /* @__PURE__ */ new Date(), deleted: null }
        });
        debug5("package saved successfully");
      } catch (error) {
        debug5("packages error: %o", error);
        tx.rollback();
      }
    });
  }
  async update(name, handleUpdate) {
    const manifest = await this.read(name, true);
    const manifestUpdated = await handleUpdate(manifest);
    debug5("package updated successfully");
    return manifestUpdated;
  }
  async delete(name) {
    const org_id = await this.tenant.get(name);
    await this.db.transaction(async (tx) => {
      try {
        await tx.update(packages).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm7.and)(
          (0, import_drizzle_orm7.eq)(packages.org_id, org_id),
          (0, import_drizzle_orm7.eq)(packages.name, name)
        ));
        debug5("package deleted successfully");
      } catch (error) {
        debug5("packages error: %o", error);
        tx.rollback();
      }
      try {
        await tx.update(readmes).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm7.and)(
          (0, import_drizzle_orm7.eq)(readmes.org_id, org_id),
          (0, import_drizzle_orm7.eq)(readmes.name, name)
        ));
        debug5("readmes deleted successfully");
      } catch (error) {
        debug5("readmes error: %o", error);
        tx.rollback();
      }
      try {
        await tx.delete(distTags).where((0, import_drizzle_orm7.and)(
          (0, import_drizzle_orm7.eq)(distTags.org_id, org_id),
          (0, import_drizzle_orm7.eq)(distTags.name, name)
        ));
        debug5("dist-tags deleted successfully");
      } catch (error) {
        debug5("dist-tags error: %o", error);
      }
      try {
        await tx.delete(metadata).where((0, import_drizzle_orm7.and)(
          (0, import_drizzle_orm7.eq)(metadata.org_id, org_id),
          (0, import_drizzle_orm7.eq)(metadata.name, name)
        ));
        debug5("package metadata deleted successfully");
      } catch (error) {
        debug5("package metadata error: %o", error);
      }
    });
  }
  static async search(db, query) {
    const results = [];
    const matchQuery = import_drizzle_orm7.sql`websearch_to_tsquery('english', ${query.text})`;
    const rows = await db.select({
      name: metadata.name,
      version: metadata.version,
      updated: metadata.updated,
      rank: import_drizzle_orm7.sql`ts_rank(search_english, ${matchQuery})`
    }).from(metadata).where(import_drizzle_orm7.sql`search_english @@ ${matchQuery}`).orderBy((t) => (0, import_drizzle_orm7.desc)(t.rank)).limit(100);
    for (const row of rows) {
      results.push({
        name: row.name,
        scoped: row.name,
        path: void 0,
        time: row.rank
      });
    }
    debug5("%o packages found", results.length);
    if (!results || results.length === 0) {
      debug5("no results found");
      return results;
    }
    debug5("%o results found", results.length);
    return results.slice(query.from, query.size);
  }
  async getDistTags(names) {
    const result = {};
    const rows = await this.db.select({
      org_id: distTags.org_id,
      name: distTags.name,
      tag: distTags.tag,
      version: distTags.version
    }).from(distTags).where((0, import_drizzle_orm7.inArray)(distTags.name, names)).orderBy(distTags.name, distTags.tag);
    for (const row of rows) {
      const org_id = await this.tenant.get(row.name);
      if (row.org_id === org_id) {
        result[row.name][row.tag] = row.version;
      }
    }
    return result;
  }
};

// src/services/tarball.ts
var import_debug6 = __toESM(require("debug"));
var import_drizzle_orm8 = require("drizzle-orm");
var import_stream = require("stream");
var import_core6 = require("@verdaccio/core");
var debug6 = (0, import_debug6.default)("verdaccio:plugin:pro:db");
var CHUNK_SIZE = 256 * 1024;
var TarballService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
    this.tenant = new TenantService(database, logger);
  }
  async exists(packageName, fileName) {
    const org_id = await this.tenant.get(packageName);
    const count = await this.db.$count(
      tarballs,
      (0, import_drizzle_orm8.and)(
        (0, import_drizzle_orm8.eq)(tarballs.org_id, org_id),
        (0, import_drizzle_orm8.eq)(tarballs.name, packageName),
        (0, import_drizzle_orm8.eq)(tarballs.filename, fileName),
        (0, import_drizzle_orm8.isNull)(tarballs.deleted)
      )
    );
    const exists = count > 0;
    debug6("tarball exists: %o", exists);
    return exists;
  }
  async read(packageName, fileName, { signal }) {
    const org_id = await this.tenant.get(packageName);
    const { version } = getPackageInfoFromFilename(fileName);
    const [tarballData] = await this.db.select({
      data: tarballs.data,
      size: tarballs.size
    }).from(tarballs).where((0, import_drizzle_orm8.and)(
      (0, import_drizzle_orm8.eq)(tarballs.org_id, org_id),
      (0, import_drizzle_orm8.eq)(tarballs.name, packageName),
      (0, import_drizzle_orm8.eq)(tarballs.version, version),
      (0, import_drizzle_orm8.isNull)(tarballs.deleted)
    ));
    if (!tarballData) {
      throw import_core6.errorUtils.getNotFound(`Tarball not found: ${fileName}`);
    }
    const readable = new import_stream.Readable({
      read() {
        for (let i = 0; i < tarballData.data.length; i += CHUNK_SIZE) {
          const dataChunk = tarballData.data.subarray(i, i + CHUNK_SIZE);
          this.push(dataChunk);
          if (dataChunk.length !== CHUNK_SIZE) {
            break;
          }
        }
        this.push(null);
      }
    });
    signal.addEventListener("abort", () => {
      debug6("aborting read stream");
      tarballData.data = Buffer.alloc(0);
      readable.destroy();
    });
    readable.on("open", () => {
      debug6("opening read stream");
      readable.emit("content-size", tarballData.size);
    });
    process.nextTick(() => {
      readable.emit("open");
    });
    debug6("returning readable stream");
    return readable;
  }
  async write(packageName, fileName, { signal }) {
    const org_id = await this.tenant.get(packageName);
    const { version } = getPackageInfoFromFilename(fileName);
    const chunks = [];
    const writable = new import_stream.Writable({
      write(chunk, encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      }
    });
    signal.addEventListener("abort", () => {
      debug6("aborting write stream");
      writable.destroy();
    });
    process.nextTick(() => {
      debug6("opening write stream");
      writable.emit("open");
    });
    writable.on("finish", async () => {
      const data = Buffer.concat(chunks);
      const tarballData = {
        org_id,
        name: packageName,
        version,
        filename: fileName,
        data,
        size: data.length
      };
      try {
        await this.db.insert(tarballs).values(tarballData).onConflictDoUpdate({
          target: [tarballs.org_id, tarballs.name, tarballs.version],
          set: {
            data: import_drizzle_orm8.sql`excluded.data`,
            size: import_drizzle_orm8.sql`excluded.size`,
            updated: /* @__PURE__ */ new Date(),
            deleted: null
          }
        });
        debug6("tarball written successfully");
      } catch (err) {
        debug6("write error: %o", err);
        tarballData.data = Buffer.alloc(0);
        writable.destroy(err);
      }
    });
    writable.on("error", (err) => {
      debug6("write stream error: %o", err);
      writable.destroy(err);
    });
    debug6("returning writable stream");
    return writable;
  }
  async delete(packageName, fileName) {
    const org_id = await this.tenant.get(packageName);
    const { version } = getPackageInfoFromFilename(fileName);
    try {
      await this.db.update(tarballs).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm8.and)(
        (0, import_drizzle_orm8.eq)(tarballs.org_id, org_id),
        (0, import_drizzle_orm8.eq)(tarballs.name, packageName),
        (0, import_drizzle_orm8.eq)(tarballs.version, version)
      ));
      debug6("tarball deleted");
    } catch (error) {
      debug6("error: %o", error);
      throw import_core6.errorUtils.getInternalError(`Error deleting tarball: ${error}`);
    }
  }
  async remove(packageName) {
    const org_id = await this.tenant.get(packageName);
    try {
      await this.db.update(tarballs).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm8.and)(
        (0, import_drizzle_orm8.eq)(tarballs.org_id, org_id),
        (0, import_drizzle_orm8.eq)(tarballs.name, packageName)
      ));
      debug6("all tarballs removed");
    } catch (error) {
      debug6("error: %o", error);
      throw import_core6.errorUtils.getInternalError(`Error removing all tarballs: ${error}`);
    }
  }
};

// src/services/token.ts
var import_debug7 = __toESM(require("debug"));
var import_drizzle_orm9 = require("drizzle-orm");
var import_core7 = require("@verdaccio/core");
var debug7 = (0, import_debug7.default)("verdaccio:plugin:pro:db");
var TokenService = class _TokenService {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
  }
  async read({ user }) {
    const userTokens = await this.db.select({
      user: tokens.user,
      key: tokens.key,
      token: tokens.token,
      cidr: tokens.cidr,
      readonly: tokens.readonly,
      created: tokens.created,
      updated: tokens.updated
    }).from(tokens).where((0, import_drizzle_orm9.eq)(tokens.user, user)).orderBy(tokens.user, tokens.key);
    if (!userTokens || userTokens.length === 0) {
      debug7("token not found");
      return [];
    }
    const verdaccioTokens = userTokens.map((token) => _TokenService.toVerdaccioToken(token));
    debug7("token read successfully");
    return verdaccioTokens;
  }
  async save(token) {
    try {
      await this.db.insert(tokens).values(_TokenService.fromVerdaccioToken(token));
      debug7("token saved successfully");
    } catch (error) {
      debug7("tokens error: %o", error);
      throw import_core7.errorUtils.getInternalError(`Error saving token: ${error}`);
    }
  }
  async delete(user, key) {
    const exists = await this.db.select().from(tokens).where((0, import_drizzle_orm9.eq)(tokens.user, user));
    if (!exists || exists.length === 0) {
      throw new Error("user not found");
    }
    try {
      await this.db.delete(tokens).where((0, import_drizzle_orm9.and)((0, import_drizzle_orm9.eq)(tokens.user, user), (0, import_drizzle_orm9.eq)(tokens.key, key)));
      debug7("token deleted successfully");
    } catch (error) {
      debug7("tokens error: %o", error);
      throw import_core7.errorUtils.getInternalError(`Error deleting token: ${error}`);
    }
  }
  static toVerdaccioToken(token) {
    return {
      ...token,
      cidr: token.cidr || void 0,
      created: token.created && token.created.getTime(),
      updated: token.updated && token.updated.getTime()
    };
  }
  static fromVerdaccioToken(token) {
    return {
      ...token,
      created: new Date(token.created),
      updated: token.updated && new Date(token.updated) || void 0
    };
  }
};

// src/services/user-secrets.ts
var import_debug8 = __toESM(require("debug"));
var import_drizzle_orm10 = require("drizzle-orm");
var import_core8 = require("@verdaccio/core");

// src/services/cipher.ts
var import_node_crypto = require("crypto");
var import_node_util = require("util");
var password = ENV.DATABASE_SECRET;
var algorithm = "aes-192-cbc";
var keyLength = 24;
var salt = ENV.DB_SALT;
var scryptAsync = (0, import_node_util.promisify)(import_node_crypto.scrypt);
async function getKey() {
  return scryptAsync(password, salt, keyLength);
}
async function encrypt(text2) {
  const key = await getKey();
  const iv = Buffer.alloc(16);
  await (0, import_node_util.promisify)(import_node_crypto.randomFill)(iv);
  const cipher = (0, import_node_crypto.createCipheriv)(algorithm, key, iv);
  const encrypted = cipher.update(text2, "utf8", "hex") + cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}
async function decrypt(encryptedText) {
  const [ivHex, encrypted] = encryptedText.split(":");
  const key = await getKey();
  const iv = Buffer.from(ivHex, "hex");
  const decipher = (0, import_node_crypto.createDecipheriv)(algorithm, key, iv);
  return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
}

// src/services/user-secrets.ts
var debug8 = (0, import_debug8.default)("verdaccio:plugin:pro:db");
var USER_HASH_SEPARATOR = "|";
var UserSecretsService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
  }
  async count() {
    const userCount = await this.db.$count(userSecrets, (0, import_drizzle_orm10.isNull)(userSecrets.deleted));
    return userCount;
  }
  async add(user, hash, email) {
    try {
      const encryptedHash = await encrypt(user + USER_HASH_SEPARATOR + hash);
      const encryptedEmail = await encrypt(email);
      const userSecret = { user, hash: encryptedHash, email: encryptedEmail };
      await this.db.insert(userSecrets).values(userSecret);
      debug8("user added successfully");
    } catch (error) {
      debug8("user add error: %o", error);
      throw import_core8.errorUtils.getInternalError(`Error adding user: ${error}`);
    }
  }
  async remove(user) {
    try {
      await this.db.update(userSecrets).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm10.eq)(userSecrets.user, user));
      debug8("user removed successfully");
    } catch (error) {
      debug8("user remove error: %o", error);
      throw import_core8.errorUtils.getInternalError(`Error removing user: ${error}`);
    }
  }
  async getHash(user) {
    const [userSecret] = await this.db.select({ hash: userSecrets.hash }).from(userSecrets).where((0, import_drizzle_orm10.and)((0, import_drizzle_orm10.eq)(userSecrets.user, user), (0, import_drizzle_orm10.isNull)(userSecrets.deleted)));
    if (!userSecret) {
      debug8("user %s not found", user);
      return null;
    }
    const decryptedHash = await decrypt(userSecret.hash);
    return decryptedHash.split(USER_HASH_SEPARATOR)[1] ?? null;
  }
  async getEmail(user) {
    const [userSecret] = await this.db.select({ email: userSecrets.email }).from(userSecrets).where((0, import_drizzle_orm10.and)((0, import_drizzle_orm10.eq)(userSecrets.user, user), (0, import_drizzle_orm10.isNull)(userSecrets.deleted)));
    if (!userSecret) {
      debug8("user %s not found", user);
      return null;
    }
    const decryptedEmail = await decrypt(userSecret.email);
    return decryptedEmail;
  }
  async changePassword(user, hash) {
    try {
      const encryptedHash = await encrypt(user + hash);
      await this.db.update(userSecrets).set({ hash: encryptedHash, updated: /* @__PURE__ */ new Date(), deleted: null }).where((0, import_drizzle_orm10.eq)(userSecrets.user, user));
      debug8("password changed successfully");
    } catch (error) {
      debug8("password change error: %o", error);
      throw import_core8.errorUtils.getInternalError(`Error changing password: ${error}`);
    }
  }
  async changeEmail(user, email) {
    try {
      const encryptedEmail = await encrypt(email);
      await this.db.update(userSecrets).set({ email: encryptedEmail, updated: /* @__PURE__ */ new Date(), deleted: null }).where((0, import_drizzle_orm10.eq)(userSecrets.user, user));
      debug8("email changed successfully");
    } catch (error) {
      debug8("email change error: %o", error);
      throw import_core8.errorUtils.getInternalError(`Error changing email: ${error}`);
    }
  }
};

// src/services/verdaccio-secret.ts
var import_debug9 = __toESM(require("debug"));
var import_drizzle_orm11 = require("drizzle-orm");
var import_core9 = require("@verdaccio/core");
var debug9 = (0, import_debug9.default)("verdaccio:plugin:pro:db");
var SECRET_NAME = "verdaccio";
var VerdaccioSecretService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
  }
  async set(secret) {
    try {
      await this.db.insert(secrets).values({ name: SECRET_NAME, value: secret }).onConflictDoUpdate({
        target: [secrets.name],
        set: { value: import_drizzle_orm11.sql`excluded.value`, updated: /* @__PURE__ */ new Date() }
      });
      debug9("secret set successfully");
    } catch (error) {
      debug9("secrets error: %o", error);
      throw import_core9.errorUtils.getInternalError(`Error setting secret: ${error}`);
    }
    return secret;
  }
  async get() {
    const [secret] = await this.db.select({ value: secrets.value }).from(secrets).where((0, import_drizzle_orm11.eq)(secrets.name, SECRET_NAME));
    return secret ? secret.value : "";
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ANONYMOUS_USER,
  DownloadsService,
  ENV,
  EventLogService,
  GlobalTadirService,
  LocalPackagesService,
  OrgService,
  PUBLIC_PACKAGES,
  PackageService,
  TarballService,
  TenantService,
  TokenService,
  UserSecretsService,
  VerdaccioSecretService,
  bytea,
  clearReadmesFromManifest,
  clerkMembers,
  clerkOrgs,
  clerkUsers,
  counterSchema,
  distTags,
  downloads,
  eventLog,
  events,
  getDatabase,
  getISODate,
  getISODates,
  getMetadataFromManifest,
  getNameFromPackageAndScope,
  getPackageFromName,
  getPackageInfoFromFilename,
  getReadmesFromManifest,
  getScopeFromName,
  gtadir,
  localPackages,
  loggerFactory,
  mergeReadmesIntoManifest,
  metadata,
  methodEnum,
  orgMembers,
  orgs,
  packages,
  permissionEnum,
  readmes,
  roles,
  secrets,
  tarballs,
  teamMembers,
  teamPackages,
  teams,
  timesliceEnum,
  tokens,
  tsVector,
  unescapeHtmlEntities,
  userSecrets,
  users
});
//# sourceMappingURL=index.js.map