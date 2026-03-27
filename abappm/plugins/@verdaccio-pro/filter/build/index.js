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
  FilterPlugin: () => plugin_default,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/plugin.ts
var import_debug = __toESM(require("debug"));
var import_semver2 = require("semver");
var import_core = require("@verdaccio/core");

// src/utils.ts
var import_semver = require("semver");
function splitName(name) {
  const parts = name.split("/");
  if (parts.length > 1) {
    return {
      scope: parts[0],
      name: parts[1]
    };
  } else {
    return {
      name: parts[0]
    };
  }
}
function getPackageClone(packageInfo) {
  return {
    ...packageInfo,
    "versions": {
      ...packageInfo.versions
    },
    "dist-tags": {
      ...packageInfo["dist-tags"]
    }
  };
}
function isScopeRule(rule) {
  return "scope" in rule && typeof rule.scope === "string";
}
function isPackageRule(rule) {
  return "package" in rule && !("versions" in rule);
}
function isPackageAndVersionRule(rule) {
  return "package" in rule && "versions" in rule;
}
function filterBlockedVersions(packageInfo, block, logger) {
  const { scope } = splitName(packageInfo.name);
  if (scope && block.get(scope) === "scope") {
    return { ...packageInfo, versions: {}, readme: `All packages in scope ${scope} blocked by rule` };
  }
  const blockRule = block.get(packageInfo.name);
  if (!blockRule) {
    return packageInfo;
  }
  if (blockRule === "package") {
    return { ...packageInfo, versions: {}, readme: `All package versions blocked by rule` };
  }
  if (blockRule === "scope") {
    throw new Error('Unexpected case - blockRule for package should never be "scope"');
  }
  const newPackageInfo = getPackageClone(packageInfo);
  const blockedVersionRanges = blockRule.block;
  newPackageInfo.readme = (newPackageInfo.readme || "") + `
Some versions of package are blocked by rules: ${blockedVersionRanges.map((range) => range.raw)}`;
  if (blockRule.strategy === "block") {
    Object.keys(newPackageInfo.versions).forEach((version) => {
      blockedVersionRanges.forEach((versionRange) => {
        if ((0, import_semver.satisfies)(version, versionRange, { includePrerelease: true, loose: true })) {
          delete newPackageInfo.versions[version];
        }
      });
    });
    return newPackageInfo;
  }
  const nonBlockedVersions = { ...newPackageInfo.versions };
  const newVersionsMapping = {};
  blockedVersionRanges.forEach((versionRange) => {
    const allVersions = Object.keys(nonBlockedVersions);
    let lastNonBlockedVersion = null;
    let firstNonBlockedVersion = null;
    allVersions.forEach((version) => {
      if ((0, import_semver.satisfies)(version, versionRange, { includePrerelease: true, loose: true })) {
        delete nonBlockedVersions[version];
        newVersionsMapping[version] = lastNonBlockedVersion;
      } else {
        lastNonBlockedVersion = version;
        firstNonBlockedVersion = firstNonBlockedVersion ?? version;
      }
    });
  });
  logger.debug(`Filtering package ${packageInfo.name}, replacing versions`);
  logger.debug(`${JSON.stringify(newVersionsMapping)}`);
  const removedVersions = Object.entries(newVersionsMapping).filter(([_, replace]) => replace === null);
  const replacedVersions = Object.entries(newVersionsMapping).filter(([_, replace]) => replace !== null);
  removedVersions.forEach(([version]) => {
    logger.debug(`No version to replace ${version}`);
    delete newPackageInfo.versions[version];
    return;
  });
  replacedVersions.forEach(([version, replaceVersion]) => {
    newPackageInfo.versions[version] = { ...newPackageInfo.versions[replaceVersion], version };
  });
  newPackageInfo.readme += `
Some versions of package are fully blocked: ${removedVersions.map((a) => a[0])}`;
  newPackageInfo.readme += `
Some versions of package are replaced by other: ${removedVersions.map((a) => `${a[0]} => ${a[1]}`)}`;
  return newPackageInfo;
}

// src/plugin.ts
var debug = (0, import_debug.default)("verdaccio:plugin:pro:filter");
var FilterPlugin = class extends import_core.pluginUtils.Plugin {
  constructor(config, options) {
    super(config, options);
    this.config = options.config;
    this.logger = options.logger;
    const blockMap = (config.block ?? []).reduce((map, value) => {
      if (isScopeRule(value)) {
        if (!value.scope.startsWith("@")) {
          throw new TypeError(`Scope value must start with @, found: ${value.scope}`);
        }
        map.set(value.scope, "scope");
        return map;
      }
      if (isPackageRule(value)) {
        map.set(value.package, "package");
        return map;
      }
      if (isPackageAndVersionRule(value)) {
        const previousConfig = map.get(value.package) || { block: [] };
        if (typeof previousConfig === "string") {
          return map;
        }
        try {
          const range = new import_semver2.Range(value.versions);
          map.set(value.package, { block: [...previousConfig.block, range], strategy: value.strategy ?? "block" });
        } catch (e) {
          this.logger.error("Error parsing rule failed:");
          this.logger.error(e);
          this.logger.error("encountered while parsing rule:");
          this.logger.error(value);
        }
        return map;
      }
      throw new TypeError(`Could not parse rule ${JSON.stringify(value, null, 4)} in skipChecksFor`);
    }, /* @__PURE__ */ new Map());
    this.filterConfig = {
      enabled: config.enabled ?? false,
      block: blockMap
    };
    this.logger.debug(
      `Loaded plugin-secfilter, ${JSON.stringify(this.filterConfig, null, 4)}, ${Array.from(
        this.filterConfig.block.entries()
      )}`
    );
    debug("Verdaccio Pro filter plugin is enabled");
  }
  filter_metadata(packageInfo) {
    if (!this.filterConfig.enabled) {
      return Promise.resolve(packageInfo);
    }
    let newPackageInfo = packageInfo;
    if (this.filterConfig.block.size > 0) {
      newPackageInfo = filterBlockedVersions(packageInfo, this.filterConfig.block, this.logger);
    }
    return Promise.resolve(newPackageInfo);
  }
};
var plugin_default = FilterPlugin;

// src/index.ts
var index_default = plugin_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FilterPlugin
});
//# sourceMappingURL=index.js.map