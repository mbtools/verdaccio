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
let _verdaccio_core = require("@verdaccio/core");
let _verdaccio_pro_database = require("@verdaccio-pro/database");
let bcryptjs = require("bcryptjs");
bcryptjs = __toESM(bcryptjs);
//#region src/utils.ts
var debug$2 = (0, debug.default)("verdaccio:plugin:pro:auth");
/**
* verifyPassword - matches password and it's hash.
*/
async function verifyPassword(passwd, hash) {
	return await bcryptjs.default.compare(passwd, hash);
}
/**
* hashPassword - generates a hash for a password.
*/
async function hashPassword(passwd, rounds) {
	const salt = await bcryptjs.default.genSalt(rounds);
	return await bcryptjs.default.hash(passwd, salt);
}
/**
* Sanity check for a user
*/
async function sanityCheck(user, passwd, verifyFn, hash, count, maxUsers) {
	if (!user || !passwd) {
		debug$2("username or password is missing");
		return _verdaccio_core.errorUtils.getBadRequest(_verdaccio_core.API_ERROR.USERNAME_PASSWORD_REQUIRED);
	}
	if (maxUsers < 0) {
		debug$2("registration is disabled");
		return _verdaccio_core.errorUtils.getConflict(_verdaccio_core.API_ERROR.REGISTRATION_DISABLED);
	}
	if (hash) {
		if (await verifyFn(user, hash)) {
			debug$2(`user ${user} already exists`);
			return _verdaccio_core.errorUtils.getConflict(_verdaccio_core.API_ERROR.USERNAME_ALREADY_REGISTERED);
		}
		debug$2(`user ${user} exists but password is wrong`);
		return _verdaccio_core.errorUtils.getUnauthorized(_verdaccio_core.API_ERROR.UNAUTHORIZED_ACCESS);
	} else if (count >= maxUsers) {
		debug$2("maximum amount of users reached");
		return _verdaccio_core.errorUtils.getForbidden(_verdaccio_core.API_ERROR.MAX_USERS_REACHED);
	}
	debug$2("sanity check passed");
	return null;
}
//#endregion
//#region src/plugin.ts
var debug$1 = (0, debug.default)("verdaccio:plugin:pro:auth");
var AuthPlugin = class extends _verdaccio_core.pluginUtils.Plugin {
	constructor(config, options) {
		debug$1("start auth plugin");
		if (_verdaccio_pro_database.ENV.DB_FALLBACK) throw _verdaccio_core.errorUtils.getServiceUnavailable("[auth] Fallback to default authentication plugin enabled");
		super(config, options);
		this.config = options.config;
		this.logger = options.logger;
		this.authConfig = {
			url: config?.url || _verdaccio_pro_database.ENV.DATABASE_URL,
			rounds: config?.rounds || 10,
			max_users: config?.max_users || Infinity,
			slow_verify_ms: config?.slow_verify_ms || 300
		};
		if (!this.authConfig.url) throw _verdaccio_core.errorUtils.getServiceUnavailable("[auth] missing config. Add `url` to Auth plugin config or use environment variable DATABASE_URL");
		this.db = (0, _verdaccio_pro_database.getDatabase)(this.authConfig.url, this.logger);
		this.userSecretService = new _verdaccio_pro_database.UserSecretsService(this.db, this.logger);
		debug$1("Verdaccio Pro Auth plugin is enabled");
	}
	async authenticate(user, password, cb) {
		debug$1("authenticate user %o", user);
		const hash = await this.userSecretService.getHash(user);
		if (!hash) {
			debug$1("user not found");
			return cb(null, false);
		}
		let passwordValid = false;
		try {
			const start = /* @__PURE__ */ new Date();
			passwordValid = await verifyPassword(password, hash);
			const durationMs = (/* @__PURE__ */ new Date()).getTime() - start.getTime();
			if (durationMs > this.authConfig.slow_verify_ms) {
				debug$1("password took %sms to verify", durationMs);
				this.logger.warn({
					user,
					durationMs
				}, "Password for user \"@{user}\" took @{durationMs}ms to verify");
			}
		} catch (error) {
			this.logger.error({ error }, "Unable to verify user password: @{error.message}");
		}
		if (!passwordValid) {
			debug$1("invalid password");
			return cb(null, false);
		}
		debug$1("authentication succeeded!");
		return cb(null, [user]);
	}
	async adduser(user, password, cb, email) {
		debug$1("add user %o", user);
		const count = await this.userSecretService.count();
		const sanity = await sanityCheck(user, password, verifyPassword, await this.userSecretService.getHash(user), count, this.authConfig.max_users);
		debug$1("sanity check: %o", sanity);
		if (sanity) return cb(sanity, false);
		const newHash = await hashPassword(password, this.authConfig.rounds);
		try {
			await this.userSecretService.add(user, newHash, email || "");
			cb(null, true);
		} catch (error) {
			cb(error, false);
		}
	}
	async removeUser(user) {
		debug$1("remove user %o", user);
		if (!await this.userSecretService.getHash(user)) {
			debug$1("user not found");
			throw _verdaccio_core.errorUtils.getNotFound(`User '${user}' not found`);
		}
		await this.userSecretService.remove(user);
	}
	async changePassword(user, oldPassword, newPassword, cb) {
		debug$1("change password for user %o", user);
		const hash = await this.userSecretService.getHash(user);
		if (!hash) {
			debug$1("user not found");
			return cb(null, false);
		}
		if (!await verifyPassword(oldPassword, hash)) {
			debug$1("invalid old password");
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
//#endregion
//#region src/index.ts
var src_default = AuthPlugin;
//#endregion
exports.AuthPlugin = AuthPlugin;
exports.default = src_default;

//# sourceMappingURL=index.js.map