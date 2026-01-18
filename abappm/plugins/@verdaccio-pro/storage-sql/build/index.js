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
  SqlStoragePlugin: () => storage_plugin_default,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/storage-plugin.ts
var import_debug9 = __toESM(require("debug"));
var import_drizzle_orm10 = require("drizzle-orm");
var import_core8 = require("@verdaccio/core");

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
  DATABASE_SECRET: import_zod.default.string().trim().min(1),
  DATABASE_URL: import_zod.default.string().trim().min(1),
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
  DB_FALLBACK: stringBoolean.default(false)
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
  DB_FALLBACK: process.env.DB_FALLBACK
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
    const msg = message.replace(/^Query:\s*/i, "");
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
  const db = (0, import_node_postgres.drizzle)({
    connection: {
      connectionString: url,
      max: ENV.DB_MIGRATING || ENV.DB_SEEDING || ENV.DB_RESET ? 1 : ENV.DB_POOL_SIZE,
      ssl: sslConfig
    },
    logger: drizzleLogger
  });
  return db;
};

// src/services/event-log.ts
var import_debug = __toESM(require("debug"));
var import_drizzle_orm3 = require("drizzle-orm");
var import_core2 = require("@verdaccio/core");

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
      throw new Error(`Value of type ${typeof value} is not a Buffer`);
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

// src/services/org.ts
var import_drizzle_orm2 = require("drizzle-orm");
var import_core = require("@verdaccio/core");
var PUBLIC_PACKAGES = "@";
var OrgService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
    this.orgCache = /* @__PURE__ */ new Map();
  }
  async getOrgId(name) {
    const [ids] = await this.db.select({ id: orgs.id }).from(orgs).where((0, import_drizzle_orm2.eq)(orgs.org, name));
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
var debug = (0, import_debug.default)("verdaccio:plugin:pro:storage:sql");
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
      debug("activity logged successfully");
    } catch (error) {
      debug("activity error: %o", error);
    }
  }
  async getUserId(user) {
    if (!user || user === "") {
      return this.getUserId(ANONYMOUS_USER);
    }
    if (this.userCache.has(user)) {
      return this.userCache.get(user);
    }
    const [ids] = await this.db.select({ id: users.id }).from(users).where((0, import_drizzle_orm3.and)((0, import_drizzle_orm3.eq)(users.user, user), (0, import_drizzle_orm3.isNull)(users.deleted)));
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
    const [ids] = await this.db.select({ id: events.id }).from(events).where((0, import_drizzle_orm3.eq)(events.event, event));
    if (!ids) {
      throw import_core2.errorUtils.getNotFound(`event "${event}" not found`);
    }
    const id = ids.id;
    this.eventCache.set(event, id);
    return id;
  }
};

// src/services/downloads.ts
var import_debug2 = __toESM(require("debug"));
var import_drizzle_orm4 = require("drizzle-orm");

// src/services/utils.ts
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
var debug2 = (0, import_debug2.default)("verdaccio:plugin:pro:storage:sql");
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
        set: { count: import_drizzle_orm4.sql`${downloads.count} + 1` }
      });
      debug2("downloads incremented successfully");
    } catch (error) {
      debug2("downloads error: %o", error);
    }
  }
  async getDownloads(timeslice, start, end) {
    const [startDate, endDate] = getISODates(start, end);
    const data = await this.db.select({
      date: downloads.date,
      count: (0, import_drizzle_orm4.sum)(downloads.count)
    }).from(downloads).where((0, import_drizzle_orm4.and)(
      (0, import_drizzle_orm4.eq)(downloads.timeslice, timeslice),
      (0, import_drizzle_orm4.between)(downloads.date, startDate, endDate),
      (0, import_drizzle_orm4.isNull)(downloads.name)
    )).groupBy(downloads.date).orderBy(downloads.date);
    return data.map((d) => ({ date: d.date, count: Number(d.count) }));
  }
  async getByPackage(packageName, start, end) {
    const [startDate, endDate] = getISODates(start, end);
    const data = await this.db.select({
      date: downloads.date,
      count: (0, import_drizzle_orm4.sum)(downloads.count)
    }).from(downloads).where((0, import_drizzle_orm4.and)(
      (0, import_drizzle_orm4.eq)(downloads.timeslice, "d"),
      (0, import_drizzle_orm4.between)(downloads.date, startDate, endDate),
      (0, import_drizzle_orm4.eq)(downloads.name, packageName)
    )).groupBy(downloads.date).orderBy(downloads.date);
    return data.map((d) => ({ date: d.date, count: Number(d.count) }));
  }
  async getByVersion(packageName, start, end) {
    const [startDate, endDate] = getISODates(start, end);
    const data = await this.db.select({
      version: downloads.version,
      count: (0, import_drizzle_orm4.sum)(downloads.count)
    }).from(downloads).where((0, import_drizzle_orm4.and)(
      (0, import_drizzle_orm4.eq)(downloads.timeslice, "d"),
      (0, import_drizzle_orm4.between)(downloads.date, startDate, endDate),
      (0, import_drizzle_orm4.eq)(downloads.name, packageName)
    )).groupBy(downloads.version).orderBy(downloads.version);
    return data.map((d) => ({ version: d.version, count: Number(d.count) }));
  }
};

// src/services/local-package.ts
var import_debug3 = __toESM(require("debug"));
var import_drizzle_orm5 = require("drizzle-orm");
var import_core3 = require("@verdaccio/core");
var debug3 = (0, import_debug3.default)("verdaccio:plugin:pro:storage:sql");
var LocalPackagesService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
    this.tenant = new TenantService(database, logger);
  }
  async add(name) {
    debug3("add local package %o", name);
    const org_id = await this.tenant.get(name);
    try {
      await this.db.insert(localPackages).values({ org_id, name }).onConflictDoUpdate({
        target: [localPackages.org_id, localPackages.name],
        set: { updated: /* @__PURE__ */ new Date() }
      });
      debug3("package %o has been added", name);
    } catch (error) {
      debug3("upsert error: %o", error);
      throw import_core3.errorUtils.getInternalError(`Error adding local package: ${error}`);
    }
  }
  async remove(name) {
    debug3("remove local package %o", name);
    const org_id = await this.tenant.get(name);
    try {
      await this.db.delete(localPackages).where((0, import_drizzle_orm5.and)((0, import_drizzle_orm5.eq)(localPackages.org_id, org_id), (0, import_drizzle_orm5.eq)(localPackages.name, name)));
      debug3("package %o has been removed", name);
    } catch (error) {
      debug3("delete error: %o", error);
      throw import_core3.errorUtils.getInternalError(`Error deleting local package: ${error}`);
    }
  }
  async get() {
    debug3("get full list of package");
    const names = await this.db.select({ name: localPackages.name }).from(localPackages).orderBy(localPackages.name);
    debug3("list of %o packages has been fetched", names ? names.length : 0);
    return names.map((row) => row.name);
  }
  async clean() {
    debug3("clean all local packages");
    await this.db.execute(import_drizzle_orm5.sql`TRUNCATE TABLE local_packages`);
  }
};

// src/services/package.ts
var import_debug4 = __toESM(require("debug"));
var import_drizzle_orm6 = require("drizzle-orm");
var import_core4 = require("@verdaccio/core");

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
    manifestCopy.versions[version].readme = "";
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
var debug4 = (0, import_debug4.default)("verdaccio:plugin:pro:storage:sql");
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
      (0, import_drizzle_orm6.and)(
        (0, import_drizzle_orm6.eq)(packages.org_id, org_id),
        (0, import_drizzle_orm6.eq)(packages.name, name),
        (0, import_drizzle_orm6.isNull)(packages.deleted)
      )
    );
    const exists = count > 0;
    debug4("package exists: %o", exists);
    return exists;
  }
  async create(name, manifest) {
    await this.save(name, manifest);
    debug4("package created successfully");
  }
  async read(name, noThrow) {
    const org_id = await this.tenant.get(name);
    const [packageJson] = await this.db.select({ json: packages.json }).from(packages).where((0, import_drizzle_orm6.and)(
      (0, import_drizzle_orm6.eq)(packages.org_id, org_id),
      (0, import_drizzle_orm6.eq)(packages.name, name),
      (0, import_drizzle_orm6.isNull)(packages.deleted)
    ));
    if (!packageJson) {
      if (noThrow) {
        return {};
      }
      throw import_core4.errorUtils.getNotFound("package.json not found");
    }
    const manifest = JSON.parse(unescapeHtmlEntities(JSON.stringify(packageJson.json)));
    const markdown = await this.db.select({ version: readmes.version, markdown: readmes.markdown }).from(readmes).where((0, import_drizzle_orm6.and)(
      (0, import_drizzle_orm6.eq)(readmes.org_id, org_id),
      (0, import_drizzle_orm6.eq)(readmes.name, name),
      (0, import_drizzle_orm6.isNull)(readmes.deleted)
    ));
    const manifestMerged = mergeReadmesIntoManifest(manifest, markdown);
    debug4("package read successfully");
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
        await tx.delete(distTags).where((0, import_drizzle_orm6.and)(
          (0, import_drizzle_orm6.eq)(distTags.org_id, org_id),
          (0, import_drizzle_orm6.eq)(distTags.name, name)
        ));
        debug4("dist-tags deleted successfully");
      } catch (error) {
        debug4("dist-tags delete error: %o", error);
      }
      if (distTagsData && distTagsData.length > 0) {
        try {
          await tx.insert(distTags).values(distTagsData);
          debug4("dist-tags saved successfully");
        } catch (error) {
          debug4("dist-tags insert error: %o", error);
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
            set: { markdown: import_drizzle_orm6.sql`excluded.markdown`, updated: /* @__PURE__ */ new Date(), deleted: null }
          });
          debug4("readmes saved successfully");
        } catch (error) {
          debug4("readmes error: %o", error);
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
            set: { description: import_drizzle_orm6.sql`excluded.description`, keywords: import_drizzle_orm6.sql`excluded.keywords`, updated: /* @__PURE__ */ new Date() }
          });
          debug4("package metadata saved successfully");
        } catch (error) {
          debug4("package metadata error: %o", error);
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
          set: { json: import_drizzle_orm6.sql`excluded.json`, updated: /* @__PURE__ */ new Date(), deleted: null }
        });
        debug4("package saved successfully");
      } catch (error) {
        debug4("packages error: %o", error);
        tx.rollback();
      }
    });
  }
  async update(name, handleUpdate) {
    const manifest = await this.read(name, true);
    const manifestUpdated = await handleUpdate(manifest);
    debug4("package updated successfully");
    return manifestUpdated;
  }
  async delete(name) {
    const org_id = await this.tenant.get(name);
    await this.db.transaction(async (tx) => {
      try {
        await tx.update(packages).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm6.and)(
          (0, import_drizzle_orm6.eq)(packages.org_id, org_id),
          (0, import_drizzle_orm6.eq)(packages.name, name)
        ));
        debug4("package deleted successfully");
      } catch (error) {
        debug4("packages error: %o", error);
        tx.rollback();
      }
      try {
        await tx.update(readmes).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm6.and)(
          (0, import_drizzle_orm6.eq)(readmes.org_id, org_id),
          (0, import_drizzle_orm6.eq)(readmes.name, name)
        ));
        debug4("readmes deleted successfully");
      } catch (error) {
        debug4("readmes error: %o", error);
        tx.rollback();
      }
      try {
        await tx.delete(distTags).where((0, import_drizzle_orm6.and)(
          (0, import_drizzle_orm6.eq)(distTags.org_id, org_id),
          (0, import_drizzle_orm6.eq)(distTags.name, name)
        ));
        debug4("dist-tags deleted successfully");
      } catch (error) {
        debug4("dist-tags error: %o", error);
      }
      try {
        await tx.delete(metadata).where((0, import_drizzle_orm6.and)(
          (0, import_drizzle_orm6.eq)(metadata.org_id, org_id),
          (0, import_drizzle_orm6.eq)(metadata.name, name)
        ));
        debug4("package metadata deleted successfully");
      } catch (error) {
        debug4("package metadata error: %o", error);
      }
    });
  }
  static async search(db, query) {
    const results = [];
    const matchQuery = import_drizzle_orm6.sql`websearch_to_tsquery('english', ${query.text})`;
    const rows = await db.select({
      name: metadata.name,
      version: metadata.version,
      updated: metadata.updated,
      rank: import_drizzle_orm6.sql`ts_rank(search_english, ${matchQuery})`
    }).from(metadata).where(import_drizzle_orm6.sql`search_english @@ ${matchQuery}`).orderBy((t) => (0, import_drizzle_orm6.desc)(t.rank)).limit(100);
    for (const row of rows) {
      results.push({
        name: row.name,
        scoped: row.name,
        path: void 0,
        time: row.rank
      });
    }
    debug4("%o packages found", results.length);
    if (!results || results.length === 0) {
      debug4("no results found");
      return results;
    }
    debug4("%o results found", results.length);
    return results.slice(query.from, query.size);
  }
  async getDistTags(names) {
    const result = {};
    const rows = await this.db.select({
      org_id: distTags.org_id,
      name: distTags.name,
      tag: distTags.tag,
      version: distTags.version
    }).from(distTags).where((0, import_drizzle_orm6.inArray)(distTags.name, names)).orderBy(distTags.name, distTags.tag);
    for (const row of rows) {
      const org_id = await this.tenant.get(row.name);
      if (row.org_id === org_id) {
        result[row.name][row.tag] = row.version;
      }
    }
    return result;
  }
};

// src/services/token.ts
var import_debug5 = __toESM(require("debug"));
var import_core5 = require("@verdaccio/core");
var import_drizzle_orm7 = require("drizzle-orm");
var debug5 = (0, import_debug5.default)("verdaccio:plugin:pro:storage:sql");
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
    }).from(tokens).where((0, import_drizzle_orm7.eq)(tokens.user, user)).orderBy(tokens.user, tokens.key);
    if (!userTokens || userTokens.length === 0) {
      debug5("token not found");
      return [];
    }
    const verdaccioTokens = userTokens.map((token) => _TokenService.toVerdaccioToken(token));
    debug5("token read successfully");
    return verdaccioTokens;
  }
  async save(token) {
    try {
      await this.db.insert(tokens).values(_TokenService.fromVerdaccioToken(token));
      debug5("token saved successfully");
    } catch (error) {
      debug5("tokens error: %o", error);
      throw import_core5.errorUtils.getInternalError(`Error saving token: ${error}`);
    }
  }
  async delete(user, key) {
    const exists = await this.db.select().from(tokens).where((0, import_drizzle_orm7.eq)(tokens.user, user));
    if (!exists || exists.length === 0) {
      throw new Error("user not found");
    }
    try {
      await this.db.delete(tokens).where((0, import_drizzle_orm7.and)((0, import_drizzle_orm7.eq)(tokens.user, user), (0, import_drizzle_orm7.eq)(tokens.key, key)));
      debug5("token deleted successfully");
    } catch (error) {
      debug5("tokens error: %o", error);
      throw import_core5.errorUtils.getInternalError(`Error deleting token: ${error}`);
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

// src/services/verdaccio-secret.ts
var import_debug6 = __toESM(require("debug"));
var import_core6 = require("@verdaccio/core");
var import_drizzle_orm8 = require("drizzle-orm");
var debug6 = (0, import_debug6.default)("verdaccio:plugin:pro:storage:sql");
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
        set: { value: import_drizzle_orm8.sql`excluded.value`, updated: /* @__PURE__ */ new Date() }
      });
      debug6("secret set successfully");
    } catch (error) {
      debug6("secrets error: %o", error);
      throw import_core6.errorUtils.getInternalError(`Error setting secret: ${error}`);
    }
    return secret;
  }
  async get() {
    const [secret] = await this.db.select({ value: secrets.value }).from(secrets).where((0, import_drizzle_orm8.eq)(secrets.name, SECRET_NAME));
    return secret ? secret.value : "";
  }
};

// src/storage-handler.ts
var import_debug8 = __toESM(require("debug"));

// src/services/tarball.ts
var import_debug7 = __toESM(require("debug"));
var import_drizzle_orm9 = require("drizzle-orm");
var import_stream = require("stream");
var import_core7 = require("@verdaccio/core");
var debug7 = (0, import_debug7.default)("verdaccio:plugin:pro:storage:sql");
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
      (0, import_drizzle_orm9.and)(
        (0, import_drizzle_orm9.eq)(tarballs.org_id, org_id),
        (0, import_drizzle_orm9.eq)(tarballs.name, packageName),
        (0, import_drizzle_orm9.eq)(tarballs.filename, fileName),
        (0, import_drizzle_orm9.isNull)(tarballs.deleted)
      )
    );
    const exists = count > 0;
    debug7("tarball exists: %o", exists);
    return exists;
  }
  async read(packageName, fileName, { signal }) {
    const org_id = await this.tenant.get(packageName);
    const { version } = getPackageInfoFromFilename(fileName);
    const [tarballData] = await this.db.select({
      data: tarballs.data,
      size: tarballs.size
    }).from(tarballs).where((0, import_drizzle_orm9.and)(
      (0, import_drizzle_orm9.eq)(tarballs.org_id, org_id),
      (0, import_drizzle_orm9.eq)(tarballs.name, packageName),
      (0, import_drizzle_orm9.eq)(tarballs.version, version),
      (0, import_drizzle_orm9.isNull)(tarballs.deleted)
    ));
    if (!tarballData) {
      throw import_core7.errorUtils.getNotFound(`Tarball not found: ${fileName}`);
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
      debug7("aborting read stream");
      tarballData.data = Buffer.alloc(0);
      readable.destroy();
    });
    readable.on("open", () => {
      debug7("opening read stream");
      readable.emit("content-size", tarballData.size);
    });
    process.nextTick(() => {
      readable.emit("open");
    });
    debug7("returning readable stream");
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
      debug7("aborting write stream");
      writable.destroy();
    });
    process.nextTick(() => {
      debug7("opening write stream");
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
            data: import_drizzle_orm9.sql`excluded.data`,
            size: import_drizzle_orm9.sql`excluded.size`,
            updated: /* @__PURE__ */ new Date(),
            deleted: null
          }
        });
        debug7("tarball written successfully");
      } catch (err) {
        debug7("write error: %o", err);
        tarballData.data = Buffer.alloc(0);
        writable.destroy(err);
      }
    });
    writable.on("error", (err) => {
      debug7("write stream error: %o", err);
      writable.destroy(err);
    });
    debug7("returning writable stream");
    return writable;
  }
  async delete(packageName, fileName) {
    const org_id = await this.tenant.get(packageName);
    const { version } = getPackageInfoFromFilename(fileName);
    try {
      await this.db.update(tarballs).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm9.and)(
        (0, import_drizzle_orm9.eq)(tarballs.org_id, org_id),
        (0, import_drizzle_orm9.eq)(tarballs.name, packageName),
        (0, import_drizzle_orm9.eq)(tarballs.version, version)
      ));
      debug7("tarball deleted");
    } catch (error) {
      debug7("error: %o", error);
      throw import_core7.errorUtils.getInternalError(`Error deleting tarball: ${error}`);
    }
  }
  async remove(packageName) {
    const org_id = await this.tenant.get(packageName);
    try {
      await this.db.update(tarballs).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm9.and)(
        (0, import_drizzle_orm9.eq)(tarballs.org_id, org_id),
        (0, import_drizzle_orm9.eq)(tarballs.name, packageName)
      ));
      debug7("all tarballs removed");
    } catch (error) {
      debug7("error: %o", error);
      throw import_core7.errorUtils.getInternalError(`Error removing all tarballs: ${error}`);
    }
  }
};

// src/storage-handler.ts
var debug8 = (0, import_debug8.default)("verdaccio:plugin:pro:storage:sql:handler");
var SqlStorageHandler = class {
  constructor(database, logger, packageName) {
    debug8("start storage handler");
    this.logger = logger;
    this.package = new PackageService(database, logger);
    this.tarball = new TarballService(database, logger);
    this.packageName = packageName;
  }
  // Package API
  async readPackage(packageName) {
    debug8("read package %o", packageName);
    return this.package.read(packageName);
  }
  async hasPackage(packageName) {
    debug8("has package %o", packageName);
    return this.package.exists(packageName);
  }
  async updatePackage(packageName, handleUpdate) {
    debug8("update package %o", packageName);
    return this.package.update(packageName, handleUpdate);
  }
  async deletePackage(fileName) {
    debug8("remove tarball %o", fileName);
    if (fileName !== "package.json") {
      await this.tarball.delete(this.packageName, fileName);
    }
  }
  async removePackage(packageName) {
    debug8("remove package %o", packageName);
    return this.package.delete(packageName);
  }
  async createPackage(packageName, manifest) {
    debug8("create package %o", packageName);
    return this.package.create(packageName, manifest);
  }
  async savePackage(packageName, manifest) {
    debug8("save package %o", packageName);
    return this.package.save(packageName, manifest);
  }
  // Tarball API
  async hasTarball(fileName) {
    debug8("has tarball %o", fileName);
    return this.tarball.exists(this.packageName, fileName);
  }
  async readTarball(fileName, { signal }) {
    debug8("read tarball %o", fileName);
    return this.tarball.read(this.packageName, fileName, { signal });
  }
  async writeTarball(fileName, { signal }) {
    debug8("write tarball %o", fileName);
    return this.tarball.write(this.packageName, fileName, { signal });
  }
  async deleteTarball(fileName) {
    debug8("delete package %o", fileName);
    return this.tarball.delete(this.packageName, fileName);
  }
};
var storage_handler_default = SqlStorageHandler;

// src/storage-plugin.ts
var debug9 = (0, import_debug9.default)("verdaccio:plugin:pro:storage:sql");
var SqlStoragePlugin = class extends import_core8.pluginUtils.Plugin {
  constructor(config2, options) {
    debug9("start storage plugin");
    if (ENV.DB_FALLBACK) {
      throw import_core8.errorUtils.getServiceUnavailable("[sql-storage] Fallback to local storage plugin enabled");
    }
    super(config2, options);
    this.config = options.config;
    this.logger = options.logger;
    this.storageConfig = { url: config2?.url || ENV.DATABASE_URL };
    if (!this.storageConfig.url) {
      throw import_core8.errorUtils.getServiceUnavailable(
        "[sql-storage] missing config. Add `url` to SQL Storage plugin config or use environment variable DATABASE_URL"
      );
    }
    this.db = getDatabase(this.storageConfig.url, this.logger);
    this.token = new TokenService(this.db, this.logger);
    this.localPackage = new LocalPackagesService(this.db, this.logger);
    this.verdaccioSecret = new VerdaccioSecretService(this.db, this.logger);
    this.downloads = new DownloadsService(this.db, this.logger);
    this.eventLog = new EventLogService(this.db, this.logger);
    debug9("Verdaccio Pro SQL Storage plugin is enabled");
  }
  async init() {
    debug9("init plugin");
    try {
      await this.db.execute(import_drizzle_orm10.sql`SELECT 1 as connection_test`);
      this.logger.info("database connection verified");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error({ error: errorMsg }, "database connection failed");
      if (errorMsg.includes("ENOTFOUND") || errorMsg.includes("ECONNREFUSED")) {
        throw import_core8.errorUtils.getServiceUnavailable(
          `[sql-storage] Cannot reach database server. Check DATABASE_URL is correct: ${this.storageConfig.url}`
        );
      } else if (errorMsg.includes("self signed certificate") || errorMsg.includes("certificate")) {
        throw import_core8.errorUtils.getServiceUnavailable(
          `[sql-storage] SSL certificate error. Try setting DB_SSL_REJECT_UNAUTHORIZED=false for self-signed certificates.`
        );
      } else if (errorMsg.includes("password authentication failed")) {
        throw import_core8.errorUtils.getServiceUnavailable(
          "[sql-storage] Database authentication failed. Check your credentials in DATABASE_URL."
        );
      } else {
        throw import_core8.errorUtils.getServiceUnavailable(
          `[sql-storage] Database connection failed: ${errorMsg}`
        );
      }
    }
    try {
      await this.db.execute(import_drizzle_orm10.sql`SELECT to_regclass('public.secrets')`);
      const result = await this.db.execute(
        import_drizzle_orm10.sql`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'secrets') as exists`
      );
      const tableExists = result.rows[0]?.exists;
      if (!tableExists) {
        throw new Error("Required database tables do not exist");
      }
      this.logger.info("database schema verified");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error({ error: errorMsg }, "database schema verification failed");
      throw import_core8.errorUtils.getServiceUnavailable(
        `[sql-storage] Database tables are missing. Please run migrations first: nx db:migrate storage-sql`
      );
    }
    debug9("Verdaccio Pro SQL Storage plugin initialized");
  }
  // Storage API
  getPackageStorage(packageName) {
    return new storage_handler_default(this.db, this.logger, packageName);
  }
  // Secret API
  async getSecret() {
    debug9("get secret");
    return this.verdaccioSecret.get();
  }
  async setSecret(secret) {
    debug9("set secret");
    return this.verdaccioSecret.set(secret);
  }
  // Package API
  async get() {
    debug9("get complete package list");
    return this.localPackage.get();
  }
  async add(packageName) {
    debug9("add package %o", packageName);
    return this.localPackage.add(packageName);
  }
  async remove(packageName) {
    debug9("remove package %o", packageName);
    return this.localPackage.remove(packageName);
  }
  async search(query) {
    debug9("search for %o", query.text);
    const results = [];
    const localResults = await PackageService.search(this.db, query);
    debug9("total results %o", localResults.length);
    const allPackages = await this.get();
    for (const result of localResults) {
      const isPrivate = allPackages.includes(result.name);
      const score = {
        final: result.time,
        detail: {
          maintenance: 1,
          popularity: 1,
          quality: 1
        }
      };
      results.push({
        package: result,
        verdaccioPrivate: isPrivate,
        verdaccioPkgCached: !isPrivate,
        score
      });
    }
    return results;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getScore(item) {
    return {
      final: 1,
      detail: {
        maintenance: 0,
        popularity: 1,
        quality: 1
      }
    };
  }
  // Token API
  async readTokens(filter) {
    debug9("get tokens for user %o", filter.user);
    return this.token.read(filter);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async saveToken(token) {
    debug9("save token for user %o", token.user);
    return this.token.save(token);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteToken(user, tokenKey) {
    debug9("delete token for user %o and token %o", user, tokenKey);
    return this.token.delete(user, tokenKey);
  }
  // Verdaccio Pro - Download Counters
  async incrementDownloads(filename) {
    debug9("increment downloads for tarball %o", filename);
    return this.downloads.increment(filename);
  }
  async getDownloads(timeslice, start, end) {
    debug9("get downloads from %o to %o for timeslice %o", start, end, timeslice);
    return this.downloads.getDownloads(timeslice, start, end);
  }
  async getDownloadsByPackage(packageName, start, end) {
    debug9("get downloads from %o to %o for package %o", start, end, packageName);
    return this.downloads.getByPackage(packageName, start, end);
  }
  async getDownloadsByVersion(packageName, start, end) {
    debug9("get downloads from %o to %o for package %o", start, end, packageName);
    return this.downloads.getByVersion(packageName, start, end);
  }
  // Verdaccio Pro - Activity Log
  async logActivity(user, method, event, name, version) {
    debug9("activity %o", { user, method, event, name, version });
    return this.eventLog.log(user, method, event, name, version);
  }
  // Escape special characters (like lodash.escapeRegExp)
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
};
var storage_plugin_default = SqlStoragePlugin;

// src/index.ts
var index_default = storage_plugin_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SqlStoragePlugin
});
//# sourceMappingURL=index.js.map