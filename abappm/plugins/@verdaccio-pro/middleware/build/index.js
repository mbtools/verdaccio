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
  MiddlewarePlugin: () => plugin_default,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/plugin.ts
var import_debug4 = __toESM(require("debug"));
var import_core = require("@verdaccio/core");

// src/middlewares/security-headers.ts
var setSecurityHeaders = (req, res, next) => {
  const origin = req.get("Origin");
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Encoding, Authorization, X-Requested-With, Accept, Origin");
  res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Type, Content-Encoding, ETag, Last-Modified");
  res.setHeader("Access-Control-Max-Age", "86400");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.protocol === "https" || req.get("X-Forwarded-Proto") === "https") {
    res.setHeader("Strict-Transport-Security", "max-age=86400; includeSubDomains; preload");
  }
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self'; form-action 'self'; font-src 'self'; base-uri 'self'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; report-uri https://csp.abappm.com/csp;"
  );
  res.setHeader("Permissions-Policy", "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(self), usb=(), fullscreen=(self)");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Robots-Tag", "noindex");
  res.setHeader("X-Powered-By", "Verdaccio");
  next();
};
var security_headers_default = setSecurityHeaders;

// src/middlewares/block-requests.ts
var blockUnwantedRequests = (req, res, next) => {
  const unwantedPattern = /\.(env|php|exe|cmd|bat|sh|csh|ksh|zsh|ps1|txt|pdf|doc|docx|xls|xlsx|ppt|pptx)$/;
  if (unwantedPattern.test(req.url)) {
    res.status(404).send("Not Found");
  } else {
    next();
  }
};
var block_requests_default = blockUnwantedRequests;

// src/middlewares/redirect-npm.ts
var import_debug = __toESM(require("debug"));
var debug = (0, import_debug.default)("verdaccio:plugin:pro:middleware");
var redirectNpmStyleUrl = (logger) => {
  return (req, res, _next) => {
    debug("redirect from %o", req.url);
    const redirectTo = "/-/web/detail" + req.url;
    logger.info({ redirectTo }, "Redirecting to @{redirectTo}");
    debug("redirect to %o", redirectTo);
    res.redirect(redirectTo);
  };
};
var redirect_npm_default = redirectNpmStyleUrl;

// src/middlewares/prototype-pollution.ts
var import_express = __toESM(require("express"));
var prototypePollutionProtection = (config) => {
  return import_express.default.json({
    strict: false,
    limit: config.max_body_size || "10mb",
    // Explicitly reject __proto__ and constructor
    verify: (_req, _res, buf) => {
      const str = buf.toString();
      if (str.includes("__proto__") || str.includes('"constructor"') || str.includes('"prototype"')) {
        throw new Error("Invalid JSON");
      }
    }
  });
};
var prototype_pollution_default = prototypePollutionProtection;

// src/middlewares/profanity-filter.ts
var import_debug2 = __toESM(require("debug"));
var import_leo_profanity = __toESM(require("leo-profanity"));
var import_de = __toESM(require("naughty-words/de.json"));
var import_fr = __toESM(require("naughty-words/fr.json"));
var debug2 = (0, import_debug2.default)("verdaccio:plugin:pro:middleware:profanity");
import_leo_profanity.default.reset();
import_leo_profanity.default.add(import_de.default);
import_leo_profanity.default.add(import_fr.default);
function valueContainsProfanity(value) {
  if (value === null || value === void 0) {
    return false;
  }
  if (typeof value === "string") {
    return import_leo_profanity.default.check(value);
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return import_leo_profanity.default.check(String(value));
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (valueContainsProfanity(value[i])) {
        return true;
      }
    }
    return false;
  }
  if (typeof value === "object") {
    const o = value;
    const keys = Object.keys(o);
    for (let i = 0; i < keys.length; i++) {
      if (valueContainsProfanity(o[keys[i]])) {
        return true;
      }
    }
    return false;
  }
  return false;
}
var profanityFilter = (req, res, next) => {
  if (req.method === "GET" || req.method === "HEAD") {
    next();
    return;
  }
  if (req.body === void 0 || req.body === null) {
    next();
    return;
  }
  if (valueContainsProfanity(req.body)) {
    debug2("request body contained profanity");
    res.status(400).send("Bad Request");
    return;
  }
  next();
};
var profanity_filter_default = profanityFilter;

// src/middlewares/blacklist-filter.ts
var import_debug3 = __toESM(require("debug"));
var import_tldts = require("tldts");

// src/middlewares/blocked-adult-domains.ts
var BLOCKED_REGISTRABLE_DOMAINS = [
  "4tube.com",
  "anyporn.com",
  "beeg.com",
  "brazzers.com",
  "chaturbate.com",
  "eporner.com",
  "erome.com",
  "fuq.com",
  "hqporner.com",
  "imagefap.com",
  "ixxx.com",
  "motherless.com",
  "nhentai.net",
  "onlyfans.com",
  "porn.com",
  "porn300.com",
  "pornhub.com",
  "porntrex.com",
  "redtube.com",
  "rule34.xxx",
  "spankbang.com",
  "thisvid.com",
  "thumbzilla.com",
  "tnaflix.com",
  "tube8.com",
  "txxx.com",
  "xhamster.com",
  "xnxx.com",
  "xvideos.com",
  "youporn.com",
  "youjizz.com"
];

// src/middlewares/blacklist-filter.ts
var debug3 = (0, import_debug3.default)("verdaccio:plugin:pro:middleware:blacklist");
var blocked = new Set(BLOCKED_REGISTRABLE_DOMAINS);
var hrefSrcRe = /(?:\bhref\s*=|\bsrc\s*=)\s*["']([^"']+)["']/gi;
var absoluteUrlRe = /https?:\/\/[^\s"'<>\]]+/gi;
var protocolRelativeRe = /(?<![:\w])\/\/[^\s"'<>\]]+/gi;
function registrableDomainFromUrlLike(raw) {
  const trimmed = raw.trim();
  if (!trimmed) {
    return null;
  }
  const withScheme = trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
  if (!/^https?:\/\//i.test(withScheme)) {
    return null;
  }
  const { domain, isIp, isPrivate } = (0, import_tldts.parse)(withScheme);
  if (!domain || isIp || isPrivate) {
    return null;
  }
  return domain;
}
function stringContainsBlockedUrl(text) {
  let m;
  hrefSrcRe.lastIndex = 0;
  while ((m = hrefSrcRe.exec(text)) !== null) {
    const reg = registrableDomainFromUrlLike(m[1]);
    if (reg && blocked.has(reg)) {
      return true;
    }
  }
  absoluteUrlRe.lastIndex = 0;
  while ((m = absoluteUrlRe.exec(text)) !== null) {
    const reg = registrableDomainFromUrlLike(m[0]);
    if (reg && blocked.has(reg)) {
      return true;
    }
  }
  protocolRelativeRe.lastIndex = 0;
  while ((m = protocolRelativeRe.exec(text)) !== null) {
    const reg = registrableDomainFromUrlLike(m[0]);
    if (reg && blocked.has(reg)) {
      return true;
    }
  }
  return false;
}
function valueContainsBlockedUrl(value) {
  if (value === null || value === void 0) {
    return false;
  }
  if (typeof value === "string") {
    return stringContainsBlockedUrl(value);
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return stringContainsBlockedUrl(String(value));
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (valueContainsBlockedUrl(value[i])) {
        return true;
      }
    }
    return false;
  }
  if (typeof value === "object") {
    const o = value;
    const keys = Object.keys(o);
    for (let i = 0; i < keys.length; i++) {
      if (valueContainsBlockedUrl(o[keys[i]])) {
        return true;
      }
    }
    return false;
  }
  return false;
}
var blacklistFilter = (req, res, next) => {
  if (req.method === "GET" || req.method === "HEAD") {
    next();
    return;
  }
  if (req.body === void 0 || req.body === null) {
    next();
    return;
  }
  if (valueContainsBlockedUrl(req.body)) {
    debug3("request body contained a blocked URL");
    res.status(400).send("Bad Request");
    return;
  }
  next();
};
var blacklist_filter_default = blacklistFilter;

// src/plugin.ts
var debug4 = (0, import_debug4.default)("verdaccio:plugin:pro:middleware");
var MiddlewarePlugin = class extends import_core.pluginUtils.Plugin {
  constructor(config, options) {
    super(config, options);
    this.config = options.config;
    this.logger = options.logger;
    this.middlewareConfig = config;
  }
  register_middlewares(app, _auth, _storage) {
    if (!this.middlewareConfig.enabled) {
      return;
    }
    debug4("Verdaccio Pro Middleware plugin is enabled");
    const c = this.middlewareConfig;
    if (c.securityHeaders !== false) {
      app.use(security_headers_default);
    }
    if (c.prototypePollutionProtection !== false) {
      app.use(prototype_pollution_default(this.config));
    }
    if (c.blockUnwantedRequests !== false) {
      app.use(block_requests_default);
    }
    if (c.profanityFilter !== false) {
      app.use(profanity_filter_default);
    }
    if (c.blacklistFilter !== false) {
      app.use(blacklist_filter_default);
    }
    if (c.redirectNpmStyleUrl !== false) {
      app.use("/package/{*all}", redirect_npm_default(this.logger));
    }
  }
};
var plugin_default = MiddlewarePlugin;

// src/index.ts
var index_default = plugin_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MiddlewarePlugin
});
//# sourceMappingURL=index.js.map