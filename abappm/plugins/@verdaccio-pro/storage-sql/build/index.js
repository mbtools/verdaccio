Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let debug = require("debug");
debug = __toESM(debug);
let drizzle_orm = require("drizzle-orm");
let _verdaccio_core = require("@verdaccio/core");
let _verdaccio_pro_database = require("@verdaccio-pro/database");
//#region src/storage-handler.ts
var debug$2 = (0, debug.default)("verdaccio:plugin:pro:storage:sql:handler");
var SqlStorageHandler = class {
	constructor(database, logger, packageName) {
		debug$2("start storage handler");
		this.logger = logger;
		this.package = new _verdaccio_pro_database.PackageService(database, logger);
		this.tarball = new _verdaccio_pro_database.TarballService(database, logger);
		this.packageName = packageName;
	}
	async readPackage(packageName) {
		debug$2("read package %o", packageName);
		return this.package.read(packageName);
	}
	async hasPackage(packageName) {
		debug$2("has package %o", packageName);
		return this.package.exists(packageName);
	}
	async updatePackage(packageName, handleUpdate) {
		debug$2("update package %o", packageName);
		return this.package.update(packageName, handleUpdate);
	}
	async deletePackage(fileName) {
		debug$2("remove tarball %o", fileName);
		if (fileName !== "package.json") await this.tarball.delete(this.packageName, fileName);
	}
	async removePackage(packageName) {
		debug$2("remove package %o", packageName);
		return this.package.delete(packageName);
	}
	async createPackage(packageName, manifest) {
		debug$2("create package %o", packageName);
		return this.package.create(packageName, manifest);
	}
	async savePackage(packageName, manifest) {
		debug$2("save package %o", packageName);
		return this.package.save(packageName, manifest);
	}
	async hasTarball(fileName) {
		debug$2("has tarball %o", fileName);
		return this.tarball.exists(this.packageName, fileName);
	}
	async readTarball(fileName, { signal }) {
		debug$2("read tarball %o", fileName);
		return this.tarball.read(this.packageName, fileName, { signal });
	}
	async writeTarball(fileName, { signal }) {
		debug$2("write tarball %o", fileName);
		return this.tarball.write(this.packageName, fileName, { signal });
	}
	async deleteTarball(fileName) {
		debug$2("delete package %o", fileName);
		return this.tarball.delete(this.packageName, fileName);
	}
};
//#endregion
//#region src/storage-plugin.ts
var debug$1 = (0, debug.default)("verdaccio:plugin:pro:storage:sql");
var SqlStoragePlugin = class extends _verdaccio_core.pluginUtils.Plugin {
	constructor(config, options) {
		debug$1("start storage plugin");
		if (_verdaccio_pro_database.ENV.DB_FALLBACK) throw _verdaccio_core.errorUtils.getServiceUnavailable("[sql-storage] Fallback to local storage plugin enabled");
		super(config, options);
		this.config = options.config;
		this.logger = options.logger;
		this.storageConfig = { url: config?.url || _verdaccio_pro_database.ENV.DATABASE_URL };
		if (!this.storageConfig.url) throw _verdaccio_core.errorUtils.getServiceUnavailable("[sql-storage] missing config. Add `url` to SQL Storage plugin config or use environment variable DATABASE_URL");
		this.db = (0, _verdaccio_pro_database.getDatabase)(this.storageConfig.url, this.logger);
		this.token = new _verdaccio_pro_database.TokenService(this.db, this.logger);
		this.localPackage = new _verdaccio_pro_database.LocalPackagesService(this.db, this.logger);
		this.verdaccioSecret = new _verdaccio_pro_database.VerdaccioSecretService(this.db, this.logger);
		this.downloads = new _verdaccio_pro_database.DownloadsService(this.db, this.logger);
		this.eventLog = new _verdaccio_pro_database.EventLogService(this.db, this.logger);
		this.gtadir = new _verdaccio_pro_database.GlobalTadirService(this.db, this.logger);
		debug$1("Verdaccio Pro SQL Storage plugin is enabled");
	}
	async init() {
		debug$1("init plugin");
		try {
			await this.db.execute(drizzle_orm.sql`SELECT 1 as connection_test`);
			this.logger.info("database connection verified");
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			this.logger.error({ error: errorMsg }, "database connection failed");
			if (errorMsg.includes("ENOTFOUND") || errorMsg.includes("ECONNREFUSED")) throw _verdaccio_core.errorUtils.getServiceUnavailable(`[sql-storage] Cannot reach database server. Check DATABASE_URL is correct: ${this.storageConfig.url}`);
			else if (errorMsg.includes("self signed certificate") || errorMsg.includes("certificate")) throw _verdaccio_core.errorUtils.getServiceUnavailable(`[sql-storage] SSL certificate error. Try setting DB_SSL_REJECT_UNAUTHORIZED=false for self-signed certificates.`);
			else if (errorMsg.includes("password authentication failed")) throw _verdaccio_core.errorUtils.getServiceUnavailable("[sql-storage] Database authentication failed. Check your credentials in DATABASE_URL.");
			else throw _verdaccio_core.errorUtils.getServiceUnavailable(`[sql-storage] Database connection failed: ${errorMsg}`);
		}
		try {
			await this.db.execute(drizzle_orm.sql`SELECT to_regclass('public.secrets')`);
			if (!(await this.db.execute(drizzle_orm.sql`SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'secrets') as exists`)).rows[0]?.exists) throw new Error("Required database tables do not exist");
			this.logger.info("database schema verified");
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			this.logger.error({ error: errorMsg }, "database schema verification failed");
			throw _verdaccio_core.errorUtils.getServiceUnavailable(`[sql-storage] Database tables are missing. Please run migrations first: nx db:migrate storage-sql`);
		}
		debug$1("Verdaccio Pro SQL Storage plugin initialized");
	}
	getPackageStorage(packageName) {
		return new SqlStorageHandler(this.db, this.logger, packageName);
	}
	async getSecret() {
		debug$1("get secret");
		return this.verdaccioSecret.get();
	}
	async setSecret(secret) {
		debug$1("set secret");
		return this.verdaccioSecret.set(secret);
	}
	async get() {
		debug$1("get complete package list");
		return this.localPackage.get();
	}
	async add(packageName) {
		debug$1("add package %o", packageName);
		return this.localPackage.add(packageName);
	}
	async remove(packageName) {
		debug$1("remove package %o", packageName);
		return this.localPackage.remove(packageName);
	}
	async search(query) {
		debug$1("search for %o", query.text);
		const results = [];
		const localResults = await _verdaccio_pro_database.PackageService.search(this.db, query);
		debug$1("total results %o", localResults.length);
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
	async readTokens(filter) {
		debug$1("get tokens for user %o", filter.user);
		return this.token.read(filter);
	}
	async saveToken(token) {
		debug$1("save token for user %o", token.user);
		return this.token.save(token);
	}
	async deleteToken(user, tokenKey) {
		debug$1("delete token for user %o and token %o", user, tokenKey);
		return this.token.delete(user, tokenKey);
	}
	async incrementDownloads(filename) {
		debug$1("increment downloads for tarball %o", filename);
		return this.downloads.increment(filename);
	}
	async getDownloads(timeslice, start, end) {
		debug$1("get downloads from %o to %o for timeslice %o", start, end, timeslice);
		return this.downloads.getDownloads(timeslice, start, end);
	}
	async getDownloadsByPackage(packageName, start, end) {
		debug$1("get downloads from %o to %o for package %o", start, end, packageName);
		return this.downloads.getByPackage(packageName, start, end);
	}
	async getDownloadsByVersion(packageName, start, end) {
		debug$1("get downloads from %o to %o for package %o", start, end, packageName);
		return this.downloads.getByVersion(packageName, start, end);
	}
	async logActivity(user, method, event, name, version) {
		debug$1("activity %o", {
			user,
			method,
			event,
			name,
			version
		});
		return this.eventLog.log(user, method, event, name, version);
	}
	escapeRegExp(string) {
		return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
};
//#endregion
//#region src/index.ts
var src_default = SqlStoragePlugin;
//#endregion
exports.SqlStoragePlugin = SqlStoragePlugin;
exports.default = src_default;
