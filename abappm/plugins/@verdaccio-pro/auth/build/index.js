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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
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
  AuthPlugin: () => plugin_default,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/plugin.ts
var import_debug3 = __toESM(require("debug"));
var import_core3 = require("@verdaccio/core");

// src/db/index.ts
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
  DB_LOGGING: stringBoolean,
  DB_SALT: import_zod.default.string().default("saltypretzel")
});
(0, import_dotenv.config)();
var envServer = envSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_SECRET: process.env.DATABASE_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
  DB_POOL_SIZE: process.env.DB_POOL_SIZE,
  DB_LOGGING: process.env.DB_LOGGING,
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
  const db = (0, import_node_postgres.drizzle)({
    connection: {
      connectionString: url,
      max: ENV.DB_POOL_SIZE,
      ssl: true
    },
    logger: drizzleLogger
  });
  if (logger) logger.info("database connected");
  return db;
};

// src/services/user-secrets.ts
var import_debug = __toESM(require("debug"));
var import_core = require("@verdaccio/core");

// src/cipher.ts
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

// src/db/schema/index.ts
var import_pg_core = require("drizzle-orm/pg-core");
var timestamps = {
  created: (0, import_pg_core.timestamp)().defaultNow().notNull(),
  updated: (0, import_pg_core.timestamp)().defaultNow().notNull()
};
var timestampsDeleted = {
  ...timestamps,
  deleted: (0, import_pg_core.timestamp)()
};
var userSecrets = (0, import_pg_core.pgTable)("user_secrets", {
  id: (0, import_pg_core.serial)().unique(),
  user: (0, import_pg_core.text)().primaryKey(),
  hash: (0, import_pg_core.text)().notNull(),
  email: (0, import_pg_core.text)().notNull(),
  ...timestampsDeleted
});

// src/services/user-secrets.ts
var import_drizzle_orm = require("drizzle-orm");
var debug = (0, import_debug.default)("verdaccio:plugin:apm:auth");
var UserSecretsService = class {
  constructor(database, logger) {
    this.db = database;
    this.logger = logger;
  }
  async count() {
    const userCount = await this.db.$count(userSecrets, (0, import_drizzle_orm.isNull)(userSecrets.deleted));
    return userCount;
  }
  async add(user, hash, email) {
    try {
      const encryptedHash = await encrypt(user + hash);
      const encryptedEmail = await encrypt(email);
      const userSecret = { user, hash: encryptedHash, email: encryptedEmail };
      await this.db.insert(userSecrets).values(userSecret);
      debug("user added successfully");
    } catch (error) {
      debug("user add error: %o", error);
      throw import_core.errorUtils.getInternalError(`Error adding user: ${error}`);
    }
  }
  async remove(user) {
    try {
      await this.db.update(userSecrets).set({ deleted: /* @__PURE__ */ new Date() }).where((0, import_drizzle_orm.eq)(userSecrets.user, user));
      debug("user removed successfully");
    } catch (error) {
      debug("user remove error: %o", error);
      throw import_core.errorUtils.getInternalError(`Error removing user: ${error}`);
    }
  }
  async getHash(user) {
    const [userSecret] = await this.db.select({ hash: userSecrets.hash }).from(userSecrets).where((0, import_drizzle_orm.and)((0, import_drizzle_orm.eq)(userSecrets.user, user), (0, import_drizzle_orm.isNull)(userSecrets.deleted)));
    if (!userSecret) {
      debug("user %s not found", user);
      return null;
    }
    const decryptedHash = decrypt(user + userSecret.hash);
    return decryptedHash;
  }
  async getEmail(user) {
    const [userSecret] = await this.db.select({ email: userSecrets.email }).from(userSecrets).where((0, import_drizzle_orm.and)((0, import_drizzle_orm.eq)(userSecrets.user, user), (0, import_drizzle_orm.isNull)(userSecrets.deleted)));
    if (!userSecret) {
      debug("user %s not found", user);
      return null;
    }
    const decryptedEmail = decrypt(user + userSecret.email);
    return decryptedEmail;
  }
  async changePassword(user, hash) {
    try {
      const encryptedHash = await encrypt(user + hash);
      await this.db.update(userSecrets).set({ hash: encryptedHash, updated: /* @__PURE__ */ new Date(), deleted: null }).where((0, import_drizzle_orm.eq)(userSecrets.user, user));
      debug("password changed successfully");
    } catch (error) {
      debug("password change error: %o", error);
      throw import_core.errorUtils.getInternalError(`Error changing password: ${error}`);
    }
  }
  async changeEmail(user, email) {
    try {
      const encryptedEmail = await encrypt(email);
      await this.db.update(userSecrets).set({ email: encryptedEmail, updated: /* @__PURE__ */ new Date(), deleted: null }).where((0, import_drizzle_orm.eq)(userSecrets.user, user));
      debug("email changed successfully");
    } catch (error) {
      debug("email change error: %o", error);
      throw import_core.errorUtils.getInternalError(`Error changing email: ${error}`);
    }
  }
};

// src/utils.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_debug2 = __toESM(require("debug"));
var import_core2 = require("@verdaccio/core");
var debug2 = (0, import_debug2.default)("verdaccio:plugin:pro:auth");
async function verifyPassword(passwd, hash) {
  return await import_bcryptjs.default.compare(passwd, hash);
}
async function hashPassword(passwd, rounds) {
  const salt2 = await import_bcryptjs.default.genSalt(rounds);
  return await import_bcryptjs.default.hash(passwd, salt2);
}
async function sanityCheck(user, passwd, verifyFn, hash, count, maxUsers) {
  if (!user || !passwd) {
    debug2("username or password is missing");
    return import_core2.errorUtils.getBadRequest(import_core2.API_ERROR.USERNAME_PASSWORD_REQUIRED);
  }
  if (maxUsers < 0) {
    debug2("registration is disabled");
    return import_core2.errorUtils.getConflict(import_core2.API_ERROR.REGISTRATION_DISABLED);
  }
  if (hash) {
    const auth = await verifyFn(user, hash);
    if (auth) {
      debug2(`user ${user} already exists`);
      return import_core2.errorUtils.getConflict(import_core2.API_ERROR.USERNAME_ALREADY_REGISTERED);
    }
    debug2(`user ${user} exists but password is wrong`);
    return import_core2.errorUtils.getUnauthorized(import_core2.API_ERROR.UNAUTHORIZED_ACCESS);
  } else if (count >= maxUsers) {
    debug2("maximum amount of users reached");
    return import_core2.errorUtils.getForbidden(import_core2.API_ERROR.MAX_USERS_REACHED);
  }
  debug2("sanity check passed");
  return null;
}

// src/plugin.ts
var debug3 = (0, import_debug3.default)("verdaccio:plugin:pro:auth");
var AuthPlugin = class extends import_core3.pluginUtils.Plugin {
  constructor(config2, options) {
    debug3("start auth plugin");
    super(config2, options);
    this.config = options.config;
    this.logger = options.logger;
    this.authConfig = {
      url: config2.url || ENV.DATABASE_URL,
      rounds: config2.rounds || 10 /* ROUNDS */,
      max_users: config2.max_users || Infinity /* MAX_USERS */,
      slow_verify_ms: config2.slow_verify_ms || 300 /* SLOW_VERIFY_MS */
    };
    if (!this.authConfig.url) {
      throw import_core3.errorUtils.getServiceUnavailable(
        "[sql-storage] missing config. Add `store.@verdaccio-pro/sql-storage.url` to your config file or use environtment DATABASE_URL"
      );
    }
    this.db = getDatabase(this.authConfig.url, this.logger);
    this.userSecretService = new UserSecretsService(this.db, this.logger);
    debug3("Verdaccio Pro auth plugin is enabled");
  }
  async authenticate(user, password2, cb) {
    debug3("authenticate user %o", user);
    const hash = await this.userSecretService.getHash(user);
    if (!hash) {
      debug3("user not found");
      return cb(null, false);
    }
    let passwordValid = false;
    try {
      const start = /* @__PURE__ */ new Date();
      passwordValid = await verifyPassword(password2, hash);
      const durationMs = (/* @__PURE__ */ new Date()).getTime() - start.getTime();
      if (durationMs > this.authConfig.slow_verify_ms) {
        debug3("password took %sms to verify", durationMs);
        this.logger.warn(
          { user, durationMs },
          'Password for user "@{user}" took @{durationMs}ms to verify'
        );
      }
    } catch (error) {
      this.logger.error({ error }, "Unable to verify user password: @{error.message}");
    }
    if (!passwordValid) {
      debug3("invalid password");
      return cb(null, false);
    }
    debug3("authentication succeeded!");
    return cb(null, [user]);
  }
  // TODO: email is not part of the Auth interface (yet)
  async adduser(user, password2, cb, email) {
    debug3("add user %o", user);
    const count = await this.userSecretService.count();
    const oldHash = await this.userSecretService.getHash(user);
    const sanity = await sanityCheck(user, password2, verifyPassword, oldHash, count, this.authConfig.max_users);
    debug3("sanity check: %o", sanity);
    if (sanity) {
      return cb(sanity, false);
    }
    const newHash = await hashPassword(password2, this.authConfig.rounds);
    try {
      await this.userSecretService.add(user, newHash, email || "");
      cb(null, true);
    } catch (error) {
      cb(error, false);
    }
  }
  async removeUser(user) {
    debug3("remove user %o", user);
    const hash = await this.userSecretService.getHash(user);
    if (!hash) {
      debug3("user not found");
      throw import_core3.errorUtils.getNotFound(`User '${user}' not found`);
    }
    await this.userSecretService.remove(user);
  }
  async changePassword(user, oldPassword, newPassword, cb) {
    debug3("change password for user %o", user);
    const hash = await this.userSecretService.getHash(user);
    if (!hash) {
      debug3("user not found");
      return cb(null, false);
    }
    const passwordValid = await verifyPassword(oldPassword, hash);
    if (!passwordValid) {
      debug3("invalid old password");
      throw new Error(`Unable to change password for user '${user}': invalid old password`);
    }
    const newHash = await hashPassword(newPassword, this.authConfig.rounds);
    try {
      await this.userSecretService.changePassword(user, newHash);
      cb(null, true);
    } catch (error) {
      cb(error, false);
    }
  }
  async allow_access(user, pkg, cb) {
    cb(null, true);
  }
  async allow_publish(user, pkg, cb) {
    cb(null, true);
  }
  async allow_unpublish(user, pkg, cb) {
    cb(null, true);
  }
};
var plugin_default = AuthPlugin;

// src/index.ts
var index_default = plugin_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthPlugin
});
//# sourceMappingURL=index.js.map