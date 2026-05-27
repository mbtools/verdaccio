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
let _clerk_clerk_js = require("@clerk/clerk-js");
let _verdaccio_core = require("@verdaccio/core");
//#region src/plugin.ts
var debug$1 = (0, debug.default)("verdaccio:plugin:pro:auth-clerk");
var AuthPlugin = class extends _verdaccio_core.pluginUtils.Plugin {
	constructor(config, options) {
		debug$1("start auth plugin");
		super(config, options);
		this.config = options.config;
		this.logger = options.logger;
		this.authConfig = { clerk_publishable_key: config?.clerk_publishable_key || process.env.VITE_CLERK_PUBLISHABLE_KEY };
		if (!this.authConfig.clerk_publishable_key) throw _verdaccio_core.errorUtils.getServiceUnavailable("[auth] missing config. Add `clerk_publishable_key` to Auth plugin config or use environment variable VITE_CLERK_PUBLISHABLE_KEY");
		this.clerk = new _clerk_clerk_js.Clerk(this.authConfig.clerk_publishable_key);
		this.clerkLoadPromise = this.clerk.load();
		debug$1("Verdaccio Pro Auth plugin is enabled");
	}
	async authenticate(user, password, cb) {
		debug$1("authenticate user %o", user);
		try {
			await this.clerkLoadPromise;
			const signIn = this.clerk.client?.signIn;
			if (!signIn) {
				debug$1("clerk sign-in resource not available");
				return cb(null, false);
			}
			const signInAttempt = await signIn.create({
				identifier: user,
				password
			});
			if (signInAttempt.status === "complete") {
				if (!signInAttempt.createdSessionId) {
					debug$1("sign-in complete but missing session id");
					return cb(null, false);
				}
				await this.clerk.setActive({ session: signInAttempt.createdSessionId });
				const groups = await this.getUserGroups(user);
				debug$1("authentication succeeded!");
				return cb(null, groups);
			}
			if (signInAttempt.status === "needs_second_factor") throw _verdaccio_core.errorUtils.getServiceUnavailable("Not supported");
			debug$1("sign-in incomplete, status=%s", signInAttempt.status);
			return cb(null, false);
		} catch (error) {
			this.logger.error({
				error,
				user
			}, "Clerk sign-in failed for \"@{user}\": @{error.message}");
			debug$1("sign-in error %o", error);
			return cb(null, false);
		}
	}
	async getUserGroups(loginUser) {
		const clerkUser = this.clerk.user;
		if (!clerkUser) return [loginUser];
		const verdaccioUser = clerkUser.username ?? loginUser;
		const orgSlugs = /* @__PURE__ */ new Set();
		const memberships = clerkUser.organizationMemberships?.length ? clerkUser.organizationMemberships : (await clerkUser.getOrganizationMemberships({ pageSize: 100 })).data;
		for (const membership of memberships) {
			const slug = membership.organization?.slug;
			if (slug) orgSlugs.add(slug.startsWith("@") ? slug : `@${slug}`);
		}
		return [verdaccioUser, ...orgSlugs];
	}
	async adduser(user, password, cb, email) {
		debug$1("add user %o", user);
		throw _verdaccio_core.errorUtils.getServiceUnavailable("Not supported");
	}
	async removeUser(user) {
		debug$1("remove user %o", user);
		throw _verdaccio_core.errorUtils.getServiceUnavailable("Not supported");
	}
	async changePassword(user, oldPassword, newPassword, cb) {
		debug$1("change password for user %o", user);
		throw _verdaccio_core.errorUtils.getServiceUnavailable("Not supported");
	}
	async allow_access(user, pkg, cb) {
		debug$1("allow access for %o", user);
		const access = pkg.access;
		if (access?.includes("$all") || access?.includes("$anonymous")) {
			debug$1("%o has been granted access", user.name);
			return cb(null, true);
		}
		if (!user.name) {
			const err = _verdaccio_core.errorUtils.getForbidden("not allowed to access package");
			this.logger.debug({ user: user.name }, "user: @{user} not allowed to access package");
			debug$1("%o not allowed to access package err", user.name, err.message);
			return cb(err);
		}
		if (access?.includes("$authenticated")) {
			debug$1("%o has been granted access", user.name);
			return cb(null, true);
		}
		for (const group of user.groups) if (access?.includes(group)) {
			debug$1("%o has been granted access via group %o", user.name, group);
			return cb(null, true);
		}
		const err = _verdaccio_core.errorUtils.getForbidden("not allowed to access package");
		debug$1("%o not allowed to access package err", user.name, err.message);
		return cb(err);
	}
	async allow_publish(user, pkg, cb) {
		debug$1("allow publish for %o", user);
		const publish = pkg.publish;
		if (publish?.includes("$all") || publish?.includes("$anonymous")) {
			debug$1("%o has been granted publish", user.name);
			return cb(null, true);
		}
		if (!user.name) {
			const err = _verdaccio_core.errorUtils.getForbidden("not allowed to publish package");
			this.logger.debug({ user: user.name }, "user: @{user} not allowed to publish package");
			debug$1("%o not allowed to publish package err", user.name, err.message);
			return cb(err);
		}
		if (publish?.includes("$authenticated")) {
			debug$1("%o has been granted publish", user.name);
			return cb(null, true);
		}
		for (const group of user.groups) if (publish?.includes(group)) {
			debug$1("%o has been granted publish via group %o", user.name, group);
			return cb(null, true);
		}
		const err = _verdaccio_core.errorUtils.getForbidden("not allowed to publish package");
		debug$1("%o not allowed to publish package err", user.name, err.message);
		return cb(err);
	}
	async allow_unpublish(user, pkg, cb) {
		debug$1("allow unpublish for %o", user);
		const unpublish = pkg.unpublish;
		if (unpublish?.includes("$all") || unpublish?.includes("$anonymous")) {
			debug$1("%o has been granted unpublish", user.name);
			return cb(null, true);
		}
		if (!user.name) {
			const err = _verdaccio_core.errorUtils.getForbidden("not allowed to unpublish package");
			this.logger.debug({ user: user.name }, "user: @{user} not allowed to unpublish package");
			debug$1("%o not allowed to unpublish package err", user.name, err.message);
			return cb(err);
		}
		if (unpublish?.includes("$authenticated")) {
			debug$1("%o has been granted unpublish", user.name);
			return cb(null, true);
		}
		for (const group of user.groups) if (unpublish?.includes(group)) {
			debug$1("%o has been granted unpublish via group %o", user.name, group);
			return cb(null, true);
		}
		const err = _verdaccio_core.errorUtils.getForbidden("not allowed to unpublish package");
		debug$1("%o not allowed to unpublish package err", user.name, err.message);
		return cb(err);
	}
};
//#endregion
//#region src/index.ts
var src_default = AuthPlugin;
//#endregion
exports.AuthPlugin = AuthPlugin;
exports.default = src_default;

//# sourceMappingURL=index.js.map