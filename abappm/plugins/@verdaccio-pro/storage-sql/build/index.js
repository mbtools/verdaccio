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
  SqlStoragePlugin: () => storage_plugin_default,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/storage-plugin.ts
var import_debug2 = __toESM(require("debug"));
var import_drizzle_orm = require("drizzle-orm");
var import_core = require("@verdaccio/core");
var import_database2 = require("@verdaccio-pro/database");

// src/storage-handler.ts
var import_debug = __toESM(require("debug"));
var import_database = require("@verdaccio-pro/database");
var debug = (0, import_debug.default)("verdaccio:plugin:pro:storage:sql:handler");
var SqlStorageHandler = class {
  constructor(database, logger, packageName) {
    debug("start storage handler");
    this.logger = logger;
    this.package = new import_database.PackageService(database, logger);
    this.tarball = new import_database.TarballService(database, logger);
    this.packageName = packageName;
  }
  // Package API
  async readPackage(packageName) {
    debug("read package %o", packageName);
    return this.package.read(packageName);
  }
  async hasPackage(packageName) {
    debug("has package %o", packageName);
    return this.package.exists(packageName);
  }
  async updatePackage(packageName, handleUpdate) {
    debug("update package %o", packageName);
    return this.package.update(packageName, handleUpdate);
  }
  async deletePackage(fileName) {
    debug("remove tarball %o", fileName);
    if (fileName !== "package.json") {
      await this.tarball.delete(this.packageName, fileName);
    }
  }
  async removePackage(packageName) {
    debug("remove package %o", packageName);
    return this.package.delete(packageName);
  }
  async createPackage(packageName, manifest) {
    debug("create package %o", packageName);
    return this.package.create(packageName, manifest);
  }
  async savePackage(packageName, manifest) {
    debug("save package %o", packageName);
    return this.package.save(packageName, manifest);
  }
  // Tarball API
  async hasTarball(fileName) {
    debug("has tarball %o", fileName);
    return this.tarball.exists(this.packageName, fileName);
  }
  async readTarball(fileName, { signal }) {
    debug("read tarball %o", fileName);
    return this.tarball.read(this.packageName, fileName, { signal });
  }
  async writeTarball(fileName, { signal }) {
    debug("write tarball %o", fileName);
    return this.tarball.write(this.packageName, fileName, { signal });
  }
  async deleteTarball(fileName) {
    debug("delete package %o", fileName);
    return this.tarball.delete(this.packageName, fileName);
  }
};
var storage_handler_default = SqlStorageHandler;

// src/storage-plugin.ts
var debug2 = (0, import_debug2.default)("verdaccio:plugin:pro:storage:sql");
var SqlStoragePlugin = class extends import_core.pluginUtils.Plugin {
  constructor(config, options) {
    debug2("start storage plugin");
    if (import_database2.ENV.DB_FALLBACK) {
      throw import_core.errorUtils.getServiceUnavailable("[sql-storage] Fallback to local storage plugin enabled");
    }
    super(config, options);
    this.config = options.config;
    this.logger = options.logger;
    this.storageConfig = { url: config?.url || import_database2.ENV.DATABASE_URL };
    if (!this.storageConfig.url) {
      throw import_core.errorUtils.getServiceUnavailable(
        "[sql-storage] missing config. Add `url` to SQL Storage plugin config or use environment variable DATABASE_URL"
      );
    }
    this.db = (0, import_database2.getDatabase)(this.storageConfig.url, this.logger);
    this.token = new import_database2.TokenService(this.db, this.logger);
    this.localPackage = new import_database2.LocalPackagesService(this.db, this.logger);
    this.verdaccioSecret = new import_database2.VerdaccioSecretService(this.db, this.logger);
    this.downloads = new import_database2.DownloadsService(this.db, this.logger);
    this.eventLog = new import_database2.EventLogService(this.db, this.logger);
    this.gtadir = new import_database2.GlobalTadirService(this.db, this.logger);
    debug2("Verdaccio Pro SQL Storage plugin is enabled");
  }
  async init() {
    debug2("init plugin");
    try {
      await this.db.execute(import_drizzle_orm.sql`SELECT 1 as connection_test`);
      this.logger.info("database connection verified");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error({ error: errorMsg }, "database connection failed");
      if (errorMsg.includes("ENOTFOUND") || errorMsg.includes("ECONNREFUSED")) {
        throw import_core.errorUtils.getServiceUnavailable(
          `[sql-storage] Cannot reach database server. Check DATABASE_URL is correct: ${this.storageConfig.url}`
        );
      } else if (errorMsg.includes("self signed certificate") || errorMsg.includes("certificate")) {
        throw import_core.errorUtils.getServiceUnavailable(
          `[sql-storage] SSL certificate error. Try setting DB_SSL_REJECT_UNAUTHORIZED=false for self-signed certificates.`
        );
      } else if (errorMsg.includes("password authentication failed")) {
        throw import_core.errorUtils.getServiceUnavailable(
          "[sql-storage] Database authentication failed. Check your credentials in DATABASE_URL."
        );
      } else {
        throw import_core.errorUtils.getServiceUnavailable(
          `[sql-storage] Database connection failed: ${errorMsg}`
        );
      }
    }
    try {
      await this.db.execute(import_drizzle_orm.sql`SELECT to_regclass('public.secrets')`);
      const result = await this.db.execute(
        import_drizzle_orm.sql`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'secrets') as exists`
      );
      const tableExists = result.rows[0]?.exists;
      if (!tableExists) {
        throw new Error("Required database tables do not exist");
      }
      this.logger.info("database schema verified");
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error({ error: errorMsg }, "database schema verification failed");
      throw import_core.errorUtils.getServiceUnavailable(
        `[sql-storage] Database tables are missing. Please run migrations first: nx db:migrate storage-sql`
      );
    }
    debug2("Verdaccio Pro SQL Storage plugin initialized");
  }
  // Storage API
  getPackageStorage(packageName) {
    return new storage_handler_default(this.db, this.logger, packageName);
  }
  // Secret API
  async getSecret() {
    debug2("get secret");
    return this.verdaccioSecret.get();
  }
  async setSecret(secret) {
    debug2("set secret");
    return this.verdaccioSecret.set(secret);
  }
  // Package API
  async get() {
    debug2("get complete package list");
    return this.localPackage.get();
  }
  async add(packageName) {
    debug2("add package %o", packageName);
    return this.localPackage.add(packageName);
  }
  async remove(packageName) {
    debug2("remove package %o", packageName);
    return this.localPackage.remove(packageName);
  }
  async search(query) {
    debug2("search for %o", query.text);
    const results = [];
    const localResults = await import_database2.PackageService.search(this.db, query);
    debug2("total results %o", localResults.length);
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
    debug2("get tokens for user %o", filter.user);
    return this.token.read(filter);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async saveToken(token) {
    debug2("save token for user %o", token.user);
    return this.token.save(token);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteToken(user, tokenKey) {
    debug2("delete token for user %o and token %o", user, tokenKey);
    return this.token.delete(user, tokenKey);
  }
  // Verdaccio Pro - Download Counters
  async incrementDownloads(filename) {
    debug2("increment downloads for tarball %o", filename);
    return this.downloads.increment(filename);
  }
  async getDownloads(timeslice, start, end) {
    debug2("get downloads from %o to %o for timeslice %o", start, end, timeslice);
    return this.downloads.getDownloads(timeslice, start, end);
  }
  async getDownloadsByPackage(packageName, start, end) {
    debug2("get downloads from %o to %o for package %o", start, end, packageName);
    return this.downloads.getByPackage(packageName, start, end);
  }
  async getDownloadsByVersion(packageName, start, end) {
    debug2("get downloads from %o to %o for package %o", start, end, packageName);
    return this.downloads.getByVersion(packageName, start, end);
  }
  // Verdaccio Pro - Activity Log
  async logActivity(user, method, event, name, version) {
    debug2("activity %o", { user, method, event, name, version });
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