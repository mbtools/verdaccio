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
let _verdaccio_loaders = require("@verdaccio/loaders");
//#region src/utils.ts
var PLUGIN_PREFIX = "verdaccio";
async function loadStoragePlugins(backends, options, pluginPrefix = PLUGIN_PREFIX) {
	const storeSanitize = (plugin) => {
		return typeof plugin.getPackageStorage === "function";
	};
	return (0, _verdaccio_loaders.asyncLoadPlugin)(backends, options, storeSanitize, false, pluginPrefix, _verdaccio_core.PLUGIN_CATEGORY.STORAGE);
}
function getBackend(backends, pluginId) {
	console.log("get backends ->", backends);
	const pluginName = `${PLUGIN_PREFIX}-${pluginId}`;
	const backend = backends[pluginName];
	if (!backend) throw new Error(`Can not find plugin backend: ${pluginName}`);
	return backend;
}
//#endregion
//#region src/storage-handler.ts
var debug$2 = (0, debug.default)("verdaccio:plugin:pro:storage:proxy");
var ProxyStorageHandler = class {
	constructor(config, logger, loadedBackends, packageName) {
		debug$2("start storage handler");
		this.config = config;
		this.logger = logger;
		this.packageName = packageName;
		const packumentBackend = getBackend(loadedBackends, this.config.packument_backend);
		this.packumentPackageStorage = packumentBackend.getPackageStorage(packageName);
		const tarballBackend = getBackend(loadedBackends, this.config.tarball_backend);
		this.tarballPackageStorage = tarballBackend.getPackageStorage(packageName);
	}
	async readPackage(packageName) {
		debug$2("read package %o", packageName);
		return this.packumentPackageStorage.readPackage(packageName);
	}
	async hasPackage(packageName) {
		debug$2("has package %o", packageName);
		return this.packumentPackageStorage.hasPackage(packageName);
	}
	async updatePackage(packageName, handleUpdate) {
		debug$2("update package %o", packageName);
		return this.packumentPackageStorage.updatePackage(packageName, handleUpdate);
	}
	async deletePackage(filename) {
		debug$2("remove tarball %o", filename);
		if (filename === "package.json") await this.packumentPackageStorage.deletePackage(filename);
		else await this.tarballPackageStorage.deletePackage(filename);
	}
	async removePackage(packageName) {
		debug$2("remove package %o", packageName);
		await this.tarballPackageStorage.removePackage(packageName);
		return this.packumentPackageStorage.removePackage(packageName);
	}
	async createPackage(packageName, manifest) {
		debug$2("create package %o", packageName);
		return this.packumentPackageStorage.createPackage(packageName, manifest);
	}
	async savePackage(packageName, manifest) {
		debug$2("save package %o", packageName);
		return this.packumentPackageStorage.savePackage(packageName, manifest);
	}
	async hasTarball(fileName) {
		debug$2("has tarball %o", fileName);
		return this.tarballPackageStorage.hasTarball(fileName);
	}
	async readTarball(fileName, { signal }) {
		debug$2("read tarball %o", fileName);
		return this.tarballPackageStorage.readTarball(fileName, { signal });
	}
	async writeTarball(fileName, { signal }) {
		debug$2("write tarball %o", fileName);
		return this.tarballPackageStorage.writeTarball(fileName, { signal });
	}
};
//#endregion
//#region src/storage-plugin.ts
var debug$1 = (0, debug.default)("verdaccio:plugin:pro:storage:proxy");
var ProxyStoragePlugin = class extends _verdaccio_core.pluginUtils.Plugin {
	constructor(config, options) {
		debug$1("start storage proxy");
		super(config, options);
		this.config = options.config;
		this.logger = options.logger;
		this.storageConfig = config;
		debug$1("Verdaccio Pro Storage Proxy plugin is enabled");
	}
	async init() {
		debug$1("init storage plugin");
		this.loadedBackends = await loadStoragePlugins(this.storageConfig.backends, { ...this });
		await getBackend(this.loadedBackends, this.storageConfig.database_backend).init();
		await getBackend(this.loadedBackends, this.storageConfig.search_backend).init();
		await getBackend(this.loadedBackends, this.storageConfig.packument_backend).init();
		await getBackend(this.loadedBackends, this.storageConfig.tarball_backend).init();
		debug$1("Verdaccio Pro Storage Proxy plugin initialized");
	}
	getPackageStorage(packageName) {
		return new ProxyStorageHandler(this.storageConfig, this.logger, this.loadedBackends, packageName);
	}
	async getSecret() {
		debug$1("get secret");
		return getBackend(this.loadedBackends, this.storageConfig.database_backend).getSecret();
	}
	async setSecret(secret) {
		debug$1("set secret");
		return getBackend(this.loadedBackends, this.storageConfig.database_backend).setSecret(secret);
	}
	async get() {
		debug$1("get complete package list");
		return getBackend(this.loadedBackends, this.storageConfig.database_backend).get();
	}
	async add(packageName) {
		debug$1("add package %o", packageName);
		return getBackend(this.loadedBackends, this.storageConfig.database_backend).add(packageName);
	}
	async remove(packageName) {
		debug$1("remove package %o", packageName);
		return getBackend(this.loadedBackends, this.storageConfig.database_backend).remove(packageName);
	}
	async search(query) {
		debug$1("search for %o", query.text);
		return getBackend(this.loadedBackends, this.storageConfig.search_backend).search(query);
	}
	async readTokens(filter) {
		debug$1("get tokens for user %o", filter.user);
		return getBackend(this.loadedBackends, this.storageConfig.database_backend).readTokens(filter);
	}
	async saveToken(token) {
		debug$1("save token for user %o", token.user);
		return getBackend(this.loadedBackends, this.storageConfig.database_backend).saveToken(token);
	}
	async deleteToken(user, tokenKey) {
		debug$1("delete token for user %o and token %o", user, tokenKey);
		return getBackend(this.loadedBackends, this.storageConfig.database_backend).deleteToken(user, tokenKey);
	}
};
//#endregion
//#region src/index.ts
var src_default = ProxyStoragePlugin;
//#endregion
exports.ProxyStoragePlugin = ProxyStoragePlugin;
exports.default = src_default;

//# sourceMappingURL=index.js.map