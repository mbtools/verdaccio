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
  ProxyStoragePlugin: () => storage_plugin_default,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/storage-plugin.ts
var import_debug2 = __toESM(require("debug"));
var import_core2 = require("@verdaccio/core");

// src/storage-handler.ts
var import_debug = __toESM(require("debug"));

// src/utils.ts
var import_core = require("@verdaccio/core");
var import_loaders = require("@verdaccio/loaders");
var PLUGIN_PREFIX = "verdaccio";
async function loadStoragePlugins(backends, options, pluginPrefix = PLUGIN_PREFIX) {
  const storeSanitize = (plugin) => {
    return typeof plugin.getPackageStorage === "function";
  };
  return (0, import_loaders.asyncLoadPlugin)(
    backends,
    options,
    storeSanitize,
    false,
    // no legacy
    pluginPrefix,
    import_core.PLUGIN_CATEGORY.STORAGE
  );
}
function getBackend(backends, pluginId) {
  console.log("get backends ->", backends);
  const pluginName = `${PLUGIN_PREFIX}-${pluginId}`;
  const backend = backends[pluginName];
  if (!backend) {
    throw new Error(`Can not find plugin backend: ${pluginName}`);
  }
  return backend;
}

// src/storage-handler.ts
var debug = (0, import_debug.default)("verdaccio:plugin:pro:storage:proxy");
var ProxyStorageHandler = class {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(config, logger, loadedBackends, packageName) {
    debug("start storage handler");
    this.config = config;
    this.logger = logger;
    this.packageName = packageName;
    const packumentBackend = getBackend(loadedBackends, this.config.packument_backend);
    this.packumentPackageStorage = packumentBackend.getPackageStorage(packageName);
    const tarballBackend = getBackend(loadedBackends, this.config.tarball_backend);
    this.tarballPackageStorage = tarballBackend.getPackageStorage(packageName);
  }
  // Package API
  async readPackage(packageName) {
    debug("read package %o", packageName);
    return this.packumentPackageStorage.readPackage(packageName);
  }
  async hasPackage(packageName) {
    debug("has package %o", packageName);
    return this.packumentPackageStorage.hasPackage(packageName);
  }
  async updatePackage(packageName, handleUpdate) {
    debug("update package %o", packageName);
    return this.packumentPackageStorage.updatePackage(packageName, handleUpdate);
  }
  async deletePackage(filename) {
    debug("remove tarball %o", filename);
    if (filename === "package.json")
      await this.packumentPackageStorage.deletePackage(filename);
    else
      await this.tarballPackageStorage.deletePackage(filename);
  }
  async removePackage(packageName) {
    debug("remove package %o", packageName);
    await this.tarballPackageStorage.removePackage(packageName);
    return this.packumentPackageStorage.removePackage(packageName);
  }
  async createPackage(packageName, manifest) {
    debug("create package %o", packageName);
    return this.packumentPackageStorage.createPackage(packageName, manifest);
  }
  async savePackage(packageName, manifest) {
    debug("save package %o", packageName);
    return this.packumentPackageStorage.savePackage(packageName, manifest);
  }
  // Tarball API
  async hasTarball(fileName) {
    debug("has tarball %o", fileName);
    return this.tarballPackageStorage.hasTarball(fileName);
  }
  async readTarball(fileName, { signal }) {
    debug("read tarball %o", fileName);
    return this.tarballPackageStorage.readTarball(fileName, { signal });
  }
  async writeTarball(fileName, { signal }) {
    debug("write tarball %o", fileName);
    return this.tarballPackageStorage.writeTarball(fileName, { signal });
  }
};
var storage_handler_default = ProxyStorageHandler;

// src/storage-plugin.ts
var debug2 = (0, import_debug2.default)("verdaccio:plugin:pro:storage:proxy");
var ProxyStoragePlugin = class extends import_core2.pluginUtils.Plugin {
  constructor(config, options) {
    debug2("start storage proxy");
    super(config, options);
    this.config = options.config;
    this.logger = options.logger;
    this.storageConfig = config;
    debug2("Verdaccio Pro Storage Proxy plugin is enabled");
  }
  async init() {
    debug2("init storage plugin");
    this.loadedBackends = await loadStoragePlugins(
      this.storageConfig.backends,
      { ...this }
      // this.config?.serverSettings?.pluginPrefix,
    );
    const db = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    await db.init();
    const search = getBackend(this.loadedBackends, this.storageConfig.search_backend);
    await search.init();
    const packument = getBackend(this.loadedBackends, this.storageConfig.packument_backend);
    await packument.init();
    const tarball = getBackend(this.loadedBackends, this.storageConfig.tarball_backend);
    await tarball.init();
    debug2("Verdaccio Pro Storage Proxy plugin initialized");
  }
  // Storage API
  getPackageStorage(packageName) {
    return new storage_handler_default(this.storageConfig, this.logger, this.loadedBackends, packageName);
  }
  // Secret API
  async getSecret() {
    debug2("get secret");
    const backend = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    return backend.getSecret();
  }
  async setSecret(secret) {
    debug2("set secret");
    const backend = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    return backend.setSecret(secret);
  }
  // Package API
  async get() {
    debug2("get complete package list");
    const backend = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    return backend.get();
  }
  async add(packageName) {
    debug2("add package %o", packageName);
    const backend = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    return backend.add(packageName);
  }
  async remove(packageName) {
    debug2("remove package %o", packageName);
    const backend = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    return backend.remove(packageName);
  }
  async search(query) {
    debug2("search for %o", query.text);
    const backend = getBackend(this.loadedBackends, this.storageConfig.search_backend);
    return backend.search(query);
  }
  // Token API
  async readTokens(filter) {
    debug2("get tokens for user %o", filter.user);
    const backend = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    return backend.readTokens(filter);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async saveToken(token) {
    debug2("save token for user %o", token.user);
    const backend = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    return backend.saveToken(token);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async deleteToken(user, tokenKey) {
    debug2("delete token for user %o and token %o", user, tokenKey);
    const backend = getBackend(this.loadedBackends, this.storageConfig.database_backend);
    return backend.deleteToken(user, tokenKey);
  }
};
var storage_plugin_default = ProxyStoragePlugin;

// src/index.ts
var index_default = storage_plugin_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProxyStoragePlugin
});
//# sourceMappingURL=index.js.map