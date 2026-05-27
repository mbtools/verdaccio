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
let express = require("express");
express = __toESM(express);
let leo_profanity = require("leo-profanity");
leo_profanity = __toESM(leo_profanity);
let naughty_words_de_json = require("naughty-words/de.json");
naughty_words_de_json = __toESM(naughty_words_de_json);
let naughty_words_fr_json = require("naughty-words/fr.json");
naughty_words_fr_json = __toESM(naughty_words_fr_json);
let tldts = require("tldts");
//#region src/middlewares/security-headers.ts
var setSecurityHeaders = (req, res, next) => {
	const origin = req.get("Origin");
	if (origin) {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Credentials", "true");
	} else res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, POST, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Encoding, Authorization, X-Requested-With, Accept, Origin");
	res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Type, Content-Encoding, ETag, Last-Modified");
	res.setHeader("Access-Control-Max-Age", "86400");
	if (req.method === "OPTIONS") {
		res.status(204).end();
		return;
	}
	if (req.protocol === "https" || req.get("X-Forwarded-Proto") === "https") res.setHeader("Strict-Transport-Security", "max-age=86400; includeSubDomains; preload");
	res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self'; form-action 'self'; font-src 'self'; base-uri 'self'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; report-uri https://csp.abappm.com/csp;");
	res.setHeader("Permissions-Policy", "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(self), usb=(), fullscreen=(self)");
	res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
	res.setHeader("X-Robots-Tag", "noindex");
	res.setHeader("X-Powered-By", "Verdaccio");
	next();
};
//#endregion
//#region src/middlewares/block-requests.ts
var blockUnwantedRequests = (req, res, next) => {
	if (/\.(env|php|exe|cmd|bat|sh|csh|ksh|zsh|ps1|txt|pdf|doc|docx|xls|xlsx|ppt|pptx)$/.test(req.url)) res.status(404).send("Not Found");
	else next();
};
//#endregion
//#region src/middlewares/redirect-npm.ts
var debug$4 = (0, debug.default)("verdaccio:plugin:pro:middleware");
var redirectNpmStyleUrl = (logger) => {
	return (req, res, _next) => {
		debug$4("redirect from %o", req.url);
		const redirectTo = "/-/web/detail" + req.url;
		logger.info({ redirectTo }, "Redirecting to @{redirectTo}");
		debug$4("redirect to %o", redirectTo);
		res.redirect(redirectTo);
	};
};
//#endregion
//#region src/middlewares/prototype-pollution.ts
var prototypePollutionProtection = (config) => {
	return express.default.json({
		strict: false,
		limit: config.max_body_size || "10mb",
		verify: (_req, _res, buf) => {
			const str = buf.toString();
			if (str.includes("__proto__") || str.includes("\"constructor\"") || str.includes("\"prototype\"")) throw new Error("Invalid JSON");
		}
	});
};
//#endregion
//#region src/middlewares/profanity-filter.ts
var debug$3 = (0, debug.default)("verdaccio:plugin:pro:middleware:profanity");
leo_profanity.default.reset();
leo_profanity.default.add(naughty_words_de_json.default);
leo_profanity.default.add(naughty_words_fr_json.default);
function valueContainsProfanity(value) {
	if (value === null || value === void 0) return false;
	if (typeof value === "string") return leo_profanity.default.check(value);
	if (typeof value === "number" || typeof value === "boolean") return leo_profanity.default.check(String(value));
	if (Array.isArray(value)) {
		for (let i = 0; i < value.length; i++) if (valueContainsProfanity(value[i])) return true;
		return false;
	}
	if (typeof value === "object") {
		const o = value;
		const keys = Object.keys(o);
		for (let i = 0; i < keys.length; i++) if (valueContainsProfanity(o[keys[i]])) return true;
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
		debug$3("request body contained profanity");
		res.status(400).send("Bad Request");
		return;
	}
	next();
};
//#endregion
//#region src/middlewares/blocked-adult-domains.ts
/**
* Registrable domains (eTLD+1) for known adult / high-risk content hosts.
*/
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
//#endregion
//#region src/middlewares/blacklist-filter.ts
var debug$2 = (0, debug.default)("verdaccio:plugin:pro:middleware:blacklist");
var blocked = new Set(BLOCKED_REGISTRABLE_DOMAINS);
var hrefSrcRe = /(?:\bhref\s*=|\bsrc\s*=)\s*["']([^"']+)["']/gi;
var absoluteUrlRe = /https?:\/\/[^\s"'<>\]]+/gi;
var protocolRelativeRe = /(?<![:\w])\/\/[^\s"'<>\]]+/gi;
function registrableDomainFromUrlLike(raw) {
	const trimmed = raw.trim();
	if (!trimmed) return null;
	const withScheme = trimmed.startsWith("//") ? `https:${trimmed}` : trimmed;
	if (!/^https?:\/\//i.test(withScheme)) return null;
	const { domain, isIp, isPrivate } = (0, tldts.parse)(withScheme);
	if (!domain || isIp || isPrivate) return null;
	return domain;
}
function stringContainsBlockedUrl(text) {
	let m;
	hrefSrcRe.lastIndex = 0;
	while ((m = hrefSrcRe.exec(text)) !== null) {
		const reg = registrableDomainFromUrlLike(m[1]);
		if (reg && blocked.has(reg)) return true;
	}
	absoluteUrlRe.lastIndex = 0;
	while ((m = absoluteUrlRe.exec(text)) !== null) {
		const reg = registrableDomainFromUrlLike(m[0]);
		if (reg && blocked.has(reg)) return true;
	}
	protocolRelativeRe.lastIndex = 0;
	while ((m = protocolRelativeRe.exec(text)) !== null) {
		const reg = registrableDomainFromUrlLike(m[0]);
		if (reg && blocked.has(reg)) return true;
	}
	return false;
}
function valueContainsBlockedUrl(value) {
	if (value === null || value === void 0) return false;
	if (typeof value === "string") return stringContainsBlockedUrl(value);
	if (typeof value === "number" || typeof value === "boolean") return stringContainsBlockedUrl(String(value));
	if (Array.isArray(value)) {
		for (let i = 0; i < value.length; i++) if (valueContainsBlockedUrl(value[i])) return true;
		return false;
	}
	if (typeof value === "object") {
		const o = value;
		const keys = Object.keys(o);
		for (let i = 0; i < keys.length; i++) if (valueContainsBlockedUrl(o[keys[i]])) return true;
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
		debug$2("request body contained a blocked URL");
		res.status(400).send("Bad Request");
		return;
	}
	next();
};
//#endregion
//#region src/plugin.ts
var debug$1 = (0, debug.default)("verdaccio:plugin:pro:middleware");
var MiddlewarePlugin = class extends _verdaccio_core.pluginUtils.Plugin {
	constructor(config, options) {
		super(config, options);
		this.config = options.config;
		this.logger = options.logger;
		this.middlewareConfig = config;
	}
	register_middlewares(app, _auth, _storage) {
		if (!this.middlewareConfig.enabled) return;
		debug$1("Verdaccio Pro Middleware plugin is enabled");
		const c = this.middlewareConfig;
		if (c.securityHeaders !== false) app.use(setSecurityHeaders);
		if (c.prototypePollutionProtection !== false) app.use(prototypePollutionProtection(this.config));
		if (c.blockUnwantedRequests !== false) app.use(blockUnwantedRequests);
		if (c.profanityFilter !== false) app.use(profanityFilter);
		if (c.blacklistFilter !== false) app.use(blacklistFilter);
		if (c.redirectNpmStyleUrl !== false) app.use("/package/{*all}", redirectNpmStyleUrl(this.logger));
	}
};
//#endregion
//#region src/index.ts
var src_default = MiddlewarePlugin;
//#endregion
exports.MiddlewarePlugin = MiddlewarePlugin;
exports.default = src_default;

//# sourceMappingURL=index.js.map