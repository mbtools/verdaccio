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
var import_debug2 = __toESM(require("debug"));
var import_core2 = require("@verdaccio/core");
var import_database = require("@verdaccio-pro/database");

// src/utils.ts
var import_bcryptjs = __toESM(require("bcryptjs"));
var import_debug = __toESM(require("debug"));
var import_core = require("@verdaccio/core");
var debug = (0, import_debug.default)("verdaccio:plugin:pro:auth");
async function verifyPassword(passwd, hash) {
  return await import_bcryptjs.default.compare(passwd, hash);
}
async function hashPassword(passwd, rounds) {
  const salt = await import_bcryptjs.default.genSalt(rounds);
  return await import_bcryptjs.default.hash(passwd, salt);
}
async function sanityCheck(user, passwd, verifyFn, hash, count, maxUsers) {
  if (!user || !passwd) {
    debug("username or password is missing");
    return import_core.errorUtils.getBadRequest(import_core.API_ERROR.USERNAME_PASSWORD_REQUIRED);
  }
  if (maxUsers < 0) {
    debug("registration is disabled");
    return import_core.errorUtils.getConflict(import_core.API_ERROR.REGISTRATION_DISABLED);
  }
  if (hash) {
    const auth = await verifyFn(user, hash);
    if (auth) {
      debug(`user ${user} already exists`);
      return import_core.errorUtils.getConflict(import_core.API_ERROR.USERNAME_ALREADY_REGISTERED);
    }
    debug(`user ${user} exists but password is wrong`);
    return import_core.errorUtils.getUnauthorized(import_core.API_ERROR.UNAUTHORIZED_ACCESS);
  } else if (count >= maxUsers) {
    debug("maximum amount of users reached");
    return import_core.errorUtils.getForbidden(import_core.API_ERROR.MAX_USERS_REACHED);
  }
  debug("sanity check passed");
  return null;
}

// src/plugin.ts
var debug2 = (0, import_debug2.default)("verdaccio:plugin:pro:auth");
var AuthPlugin = class extends import_core2.pluginUtils.Plugin {
  constructor(config, options) {
    debug2("start auth plugin");
    if (import_database.ENV.DB_FALLBACK) {
      throw import_core2.errorUtils.getServiceUnavailable("[auth] Fallback to default authentication plugin enabled");
    }
    super(config, options);
    this.config = options.config;
    this.logger = options.logger;
    this.authConfig = {
      url: config?.url || import_database.ENV.DATABASE_URL,
      rounds: config?.rounds || 10 /* ROUNDS */,
      max_users: config?.max_users || Infinity /* MAX_USERS */,
      slow_verify_ms: config?.slow_verify_ms || 300 /* SLOW_VERIFY_MS */
    };
    if (!this.authConfig.url) {
      throw import_core2.errorUtils.getServiceUnavailable(
        "[auth] missing config. Add `url` to Auth plugin config or use environment variable DATABASE_URL"
      );
    }
    this.db = (0, import_database.getDatabase)(this.authConfig.url, this.logger);
    this.userSecretService = new import_database.UserSecretsService(this.db, this.logger);
    debug2("Verdaccio Pro Auth plugin is enabled");
  }
  async authenticate(user, password, cb) {
    debug2("authenticate user %o", user);
    const hash = await this.userSecretService.getHash(user);
    if (!hash) {
      debug2("user not found");
      return cb(null, false);
    }
    let passwordValid = false;
    try {
      const start = /* @__PURE__ */ new Date();
      passwordValid = await verifyPassword(password, hash);
      const durationMs = (/* @__PURE__ */ new Date()).getTime() - start.getTime();
      if (durationMs > this.authConfig.slow_verify_ms) {
        debug2("password took %sms to verify", durationMs);
        this.logger.warn(
          { user, durationMs },
          'Password for user "@{user}" took @{durationMs}ms to verify'
        );
      }
    } catch (error) {
      this.logger.error({ error }, "Unable to verify user password: @{error.message}");
    }
    if (!passwordValid) {
      debug2("invalid password");
      return cb(null, false);
    }
    debug2("authentication succeeded!");
    return cb(null, [user]);
  }
  // TODO: email is not part of the Auth interface (yet)
  async adduser(user, password, cb, email) {
    debug2("add user %o", user);
    const count = await this.userSecretService.count();
    const oldHash = await this.userSecretService.getHash(user);
    const sanity = await sanityCheck(user, password, verifyPassword, oldHash, count, this.authConfig.max_users);
    debug2("sanity check: %o", sanity);
    if (sanity) {
      return cb(sanity, false);
    }
    const newHash = await hashPassword(password, this.authConfig.rounds);
    try {
      await this.userSecretService.add(user, newHash, email || "");
      cb(null, true);
    } catch (error) {
      cb(error, false);
    }
  }
  async removeUser(user) {
    debug2("remove user %o", user);
    const hash = await this.userSecretService.getHash(user);
    if (!hash) {
      debug2("user not found");
      throw import_core2.errorUtils.getNotFound(`User '${user}' not found`);
    }
    await this.userSecretService.remove(user);
  }
  async changePassword(user, oldPassword, newPassword, cb) {
    debug2("change password for user %o", user);
    const hash = await this.userSecretService.getHash(user);
    if (!hash) {
      debug2("user not found");
      return cb(null, false);
    }
    const passwordValid = await verifyPassword(oldPassword, hash);
    if (!passwordValid) {
      debug2("invalid old password");
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