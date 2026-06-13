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
let _clerk_backend = require("@clerk/backend");
let _verdaccio_core = require("@verdaccio/core");
//#region src/plugin.ts
var debug$1 = (0, debug.default)("verdaccio:plugin:pro:clerk");
function logAccess(user, pkg, action, grant) {
	debug$1(`${action} for ${user.name} on ${pkg.name} has been ${grant ? "granted" : "denied"}`);
}
var AuthPlugin = class extends _verdaccio_core.pluginUtils.Plugin {
	constructor(config, options) {
		debug$1("start auth plugin");
		super(config, options);
		this.config = options.config;
		this.logger = options.logger;
		this.authConfig = { clerk_secret_key: config?.clerk_secret_key || process.env.CLERK_SECRET_KEY };
		if (!this.authConfig.clerk_secret_key) throw _verdaccio_core.errorUtils.getServiceUnavailable("[auth] missing config. Add `clerk_secret_key` to Auth plugin config or use environment variable CLERK_SECRET_KEY");
		this.clerkClient = (0, _clerk_backend.createClerkClient)({ secretKey: this.authConfig.clerk_secret_key });
		debug$1("Verdaccio Pro Clerk plugin is enabled");
	}
	async authenticate(user, password, callback) {
		debug$1("authenticate user %o", user);
		try {
			const clerkUser = await this.resolveUser(user);
			if (!clerkUser) {
				debug$1("user not found");
				return callback(null, false);
			}
			await this.clerkClient.users.verifyPassword({
				userId: clerkUser.id,
				password
			});
			const groups = await this.getUserGroups(clerkUser);
			debug$1("authentication succeeded!");
			return callback(null, groups);
		} catch (error) {
			this.logger.debug({
				error,
				user
			}, "Authentication failed for \"@{user}\": @{error.message}");
			debug$1("authentication error: %o", error);
			return callback(_verdaccio_core.errorUtils.getInternalError("Authentication failed"), false);
		}
	}
	async resolveUser(identifier) {
		const { data: byUsername } = await this.clerkClient.users.getUserList({
			username: [identifier],
			limit: 1
		});
		if (byUsername.length === 1) return byUsername[0];
		const { data: candidates } = await this.clerkClient.users.getUserList({
			query: identifier,
			limit: 10
		});
		const normalized = identifier.toLowerCase();
		return candidates.find((candidate) => candidate.username?.toLowerCase() === normalized || candidate.emailAddresses.some((email) => email.emailAddress.toLowerCase() === normalized));
	}
	async getUserGroups(clerkUser) {
		const orgSlugs = /* @__PURE__ */ new Set();
		const { data: memberships } = await this.clerkClient.users.getOrganizationMembershipList({
			userId: clerkUser.id,
			limit: 100
		});
		for (const membership of memberships) {
			const slug = membership.organization.slug;
			if (slug) orgSlugs.add(slug.startsWith("@") ? slug : `@${slug}`);
		}
		orgSlugs.add("@");
		orgSlugs.add("$all");
		orgSlugs.add("$authenticated");
		return [...orgSlugs];
	}
	async adduser(user, password, callback, email) {
		debug$1("add user %o", user);
		await this.authenticate(user, password, (err, groups) => {
			if (err) callback(err, false);
			else callback(null, true);
		});
	}
	async removeUser(user) {
		debug$1("remove user %o", user);
		throw _verdaccio_core.errorUtils.getServiceUnavailable("Not supported");
	}
	async changePassword(user, oldPassword, newPassword, callback) {
		debug$1("change password for user %o", user);
		throw _verdaccio_core.errorUtils.getServiceUnavailable("Not supported");
	}
	async _allow(user, pkg, action, callback) {
		const requiredGroups = pkg[action];
		if (!requiredGroups) {
			logAccess(user, pkg, action, false);
			return callback(null, false);
		}
		if (requiredGroups.includes("$anonymous")) {
			logAccess(user, pkg, action, true);
			return callback(null, true);
		}
		if (!user.name) {
			logAccess(user, pkg, action, false);
			return callback(null, false);
		}
		if (requiredGroups.includes("$all")) {
			logAccess(user, pkg, action, true);
			return callback(null, true);
		}
		try {
			const clerkUser = await this.resolveUser(user.name);
			if (!clerkUser) {
				debug$1("user not found");
				return callback(null, false);
			}
			const groups = await this.getUserGroups(clerkUser);
			let org = "@";
			if (pkg.name.startsWith("@")) org = pkg.name.split("/")[0];
			const grant = groups.includes(org);
			logAccess(user, pkg, action, grant);
			callback(null, grant);
		} catch (error) {
			this.logger.debug({
				error,
				user
			}, "Clerk authorization check failed for \"@{user}\": @{error.message}");
			debug$1("authorization check error: %o", error);
			callback(null, false);
		}
	}
	/**
	* Allow access to a package
	*/
	async allow_access(user, pkg, callback) {
		await this._allow(user, pkg, "access", callback);
	}
	/**
	* Allow publish to a package
	*/
	async allow_publish(user, pkg, callback) {
		await this._allow(user, pkg, "publish", callback);
	}
	/**
	* Allow unpublish to a package
	*/
	async allow_unpublish(user, pkg, callback) {
		if (pkg.unpublish === false) {
			logAccess(user, pkg, "unpublish", false);
			callback(null, void 0);
			return;
		}
		if (pkg.unpublish === true) {
			logAccess(user, pkg, "unpublish", false);
			callback(_verdaccio_core.errorUtils.getInternalError("Invalid package unpublish configuration"), false);
			return;
		}
		await this._allow(user, pkg, "unpublish", callback);
	}
};
//#endregion
//#region src/index.ts
var src_default = AuthPlugin;
//#endregion
exports.AuthPlugin = AuthPlugin;
exports.default = src_default;
