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
var import_debug2 = __toESM(require("debug"));
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
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
  res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Type, ETag, Last-Modified");
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
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self'; font-src 'self'; object-src 'self'; base-uri 'self'; frame-ancestors 'self';"
  );
  res.setHeader("Permissions-Policy", "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(self), usb=(), fullscreen=(self), vibrate=()");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-Robots-Tag", "noindex");
  res.setHeader("X-Powered-By", "Verdaccio");
  next();
};
var security_headers_default = setSecurityHeaders;

// src/middlewares/block-requests.ts
var blockUnwantedRequests = (req, res, next) => {
  const unwantedPattern = /\.(php|exe|cmd|ps1|txt|pdf|doc|docx|xls|xlsx|ppt|pptx)$/;
  if (unwantedPattern.test(req.url)) {
    res.status(404).send("Not Found");
  } else {
    next();
  }
};
var block_requests_default = blockUnwantedRequests;

// src/middlewares/redirect-npm.ts
var import_debug = __toESM(require("debug"));
var debug = (0, import_debug.default)("verdaccio:plugin:pro:middleware:redirect");
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
      if (str.includes("__proto__") || str.includes("constructor")) {
        throw new Error("Invalid JSON");
      }
    }
  });
};
var prototype_pollution_default = prototypePollutionProtection;

// src/plugin.ts
var debug2 = (0, import_debug2.default)("verdaccio:plugin:pro:middleware");
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
    debug2("Verdaccio Pro Middleware plugin is enabled");
    app.use(prototype_pollution_default(this.config));
    app.use(security_headers_default);
    app.use(block_requests_default);
    app.use("/package", redirect_npm_default(this.logger));
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