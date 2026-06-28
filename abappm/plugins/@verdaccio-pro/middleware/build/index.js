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
let tldts = require("tldts");
//#region src/middlewares/security-headers.ts
var CORS_METHODS = "GET, HEAD, PUT, POST, DELETE, OPTIONS";
var CORS_HEADERS = "Content-Type, Content-Encoding, Authorization, X-Requested-With, Accept, Origin";
var CORS_EXPOSE = "Content-Length, Content-Type, Content-Encoding, ETag, Last-Modified";
var normalizeOrigin = (origin) => origin.endsWith("/") ? origin.slice(0, -1) : origin;
var setSecurityHeaders = (allowedOrigins = []) => {
	const allowlist = new Set(allowedOrigins.map(normalizeOrigin));
	return (req, res, next) => {
		const origin = req.get("Origin");
		if (origin) {
			const normalizedOrigin = normalizeOrigin(origin);
			if (allowlist.has(normalizedOrigin)) {
				res.setHeader("Access-Control-Allow-Origin", normalizedOrigin);
				res.setHeader("Access-Control-Allow-Credentials", "true");
			} else res.setHeader("Access-Control-Allow-Origin", "*");
			res.setHeader("Vary", "Origin");
		} else res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", CORS_METHODS);
		res.setHeader("Access-Control-Allow-Headers", CORS_HEADERS);
		res.setHeader("Access-Control-Expose-Headers", CORS_EXPOSE);
		res.setHeader("Access-Control-Max-Age", "86400");
		if (req.method === "OPTIONS") {
			res.status(204).end();
			return;
		}
		if (req.protocol === "https" || req.get("X-Forwarded-Proto") === "https") res.setHeader("Strict-Transport-Security", "max-age=86400; includeSubDomains; preload");
		res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self'; form-action 'self'; font-src 'self'; base-uri 'self'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; report-uri https://csp.abappm.com/csp; report-to default;");
		res.setHeader("Reporting-Endpoints", "default=\"https://csp.abappm.com/csp\"");
		res.setHeader("Permissions-Policy", "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(self), usb=(), fullscreen=(self)");
		res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
		res.setHeader("X-Robots-Tag", "noindex");
		res.setHeader("X-Powered-By", "Verdaccio");
		next();
	};
};
//#endregion
//#region src/middlewares/block-requests.ts
var blockUnwantedRequests = (req, res, next) => {
	if (/\.(env|php|exe|cmd|bat|sh|csh|ksh|zsh|ps1|txt|pdf|doc|docx|xls|xlsx|ppt|pptx)$/.test(req.url)) res.status(404).send("Not Found");
	else next();
};
//#endregion
//#region src/middlewares/redirect-npm.ts
var debug$6 = (0, debug.default)("verdaccio:plugin:pro:middleware");
var redirectNpmStyleUrl = (logger) => {
	return (req, res, _next) => {
		let packageName = req.params.all;
		if (Array.isArray(packageName)) packageName = packageName.join("/");
		if (!packageName) {
			res.status(404).send("Not Found");
			return;
		}
		debug$6("redirect from %o", req.url);
		const redirectTo = "/-/web/detail/" + packageName;
		logger.info({ redirectTo }, "Redirecting to @{redirectTo}");
		debug$6("redirect to %o", redirectTo);
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
//#region src/data/profanity-de.json
var profanity_de_default = [
	"analritter",
	"arsch",
	"arschficker",
	"arschlecker",
	"arschloch",
	"bimbo",
	"bratze",
	"bumsen",
	"bonze",
	"dödel",
	"fick",
	"ficken",
	"flittchen",
	"fotze",
	"fratze",
	"hackfresse",
	"hure",
	"hurensohn",
	"ische",
	"kackbratze",
	"kacke",
	"kacken",
	"kackwurst",
	"kampflesbe",
	"kanake",
	"kimme",
	"lümmel",
	"MILF",
	"möpse",
	"morgenlatte",
	"möse",
	"mufti",
	"muschi",
	"nackt",
	"neger",
	"nigger",
	"nippel",
	"nutte",
	"onanieren",
	"orgasmus",
	"penis",
	"pimmel",
	"pimpern",
	"pinkeln",
	"pissen",
	"pisser",
	"popel",
	"poppen",
	"porno",
	"reudig",
	"rosette",
	"schabracke",
	"schlampe",
	"scheiße",
	"scheisser",
	"schiesser",
	"schnackeln",
	"schwanzlutscher",
	"schwuchtel",
	"tittchen",
	"titten",
	"vögeln",
	"vollpfosten",
	"wichse",
	"wichsen",
	"wichser"
];
//#endregion
//#region src/data/profanity-fr.json
var profanity_fr_default = [
	"baiser",
	"bander",
	"bigornette",
	"bite",
	"bitte",
	"bloblos",
	"bordel",
	"bourré",
	"bourrée",
	"brackmard",
	"branlage",
	"branler",
	"branlette",
	"branleur",
	"branleuse",
	"brouter le cresson",
	"caca",
	"chatte",
	"chiasse",
	"chier",
	"chiottes",
	"clito",
	"clitoris",
	"con",
	"connard",
	"connasse",
	"conne",
	"couilles",
	"cramouille",
	"cul",
	"déconne",
	"déconner",
	"emmerdant",
	"emmerder",
	"emmerdeur",
	"emmerdeuse",
	"enculé",
	"enculée",
	"enculeur",
	"enculeurs",
	"enfoiré",
	"enfoirée",
	"étron",
	"fille de pute",
	"fils de pute",
	"folle",
	"foutre",
	"gerbe",
	"gerber",
	"gouine",
	"grande folle",
	"grogniasse",
	"gueule",
	"jouir",
	"la putain de ta mère",
	"MALPT",
	"ménage à trois",
	"merde",
	"merdeuse",
	"merdeux",
	"meuf",
	"nègre",
	"negro",
	"nique ta mère",
	"nique ta race",
	"palucher",
	"pédale",
	"pédé",
	"péter",
	"pipi",
	"pisser",
	"pouffiasse",
	"pousse-crotte",
	"putain",
	"pute",
	"ramoner",
	"sac à foutre",
	"sac à merde",
	"salaud",
	"salope",
	"suce",
	"tapette",
	"tanche",
	"teuch",
	"tringler",
	"trique",
	"troncher",
	"trou du cul",
	"turlute",
	"zigounette",
	"zizi"
];
//#endregion
//#region src/middlewares/profanity-filter.ts
var debug$5 = (0, debug.default)("verdaccio:plugin:pro:middleware:profanity");
leo_profanity.default.reset();
leo_profanity.default.add(profanity_de_default);
leo_profanity.default.add(profanity_fr_default);
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
		debug$5("request body contained profanity");
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
var debug$4 = (0, debug.default)("verdaccio:plugin:pro:middleware:blacklist");
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
		debug$4("request body contained a blocked URL");
		res.status(400).send("Bad Request");
		return;
	}
	next();
};
//#endregion
//#region src/middlewares/event-log.ts
var debug$3 = (0, debug.default)("verdaccio:plugin:pro:middleware:event-log");
var APM_COMMAND_HEADER = "apm-command";
var ANONYMOUS_USER = "#";
var VALID_EVENTS = /* @__PURE__ */ new Set([
	"login",
	"logout",
	"user",
	"profile",
	"org",
	"team",
	"access",
	"whoami",
	"package",
	"tarball",
	"dist-tag",
	"search",
	"downloads",
	"website",
	"keys",
	"audit",
	"hook",
	"deprecate",
	"token"
]);
function toMethod(method) {
	const normalized = method.toLowerCase();
	if (normalized === "get" || normalized === "post" || normalized === "put" || normalized === "delete") return normalized;
	return null;
}
function packageNameFromPath(path) {
	const basePath = decodeURIComponent(path).split("/-/")[0].replace(/^\//, "");
	if (!basePath) return "";
	if (basePath.startsWith("@")) {
		const slash = basePath.indexOf("/");
		if (slash > 0) return basePath.slice(0, slash + 1) + basePath.slice(slash + 1).split("/")[0];
	}
	return basePath.split("/")[0];
}
function isTarballPath(path) {
	const decoded = decodeURIComponent(path);
	return /\/-\/[^/]+\.tgz$/.test(decoded);
}
function tarballFilenameFromPath(path) {
	const decoded = decodeURIComponent(path);
	return decoded.match(/\.tgz$/) ? decoded : null;
}
function parsePackageFromUrl(path) {
	const decoded = decodeURIComponent(path);
	const name = packageNameFromPath(path);
	const tarballMatch = decoded.match(/\/-\/([^/]+)\.tgz$/);
	if (!tarballMatch) return { name };
	const filename = tarballMatch[1];
	const packageBase = name.includes("/") ? name.split("/")[1] : name;
	if (packageBase && filename.startsWith(`${packageBase}-`)) return {
		name,
		version: filename.slice(packageBase.length + 1)
	};
	return { name };
}
function resolveUser(req) {
	if (req.remote_user) return req.remote_user.name;
	const loginMatch = req.path.match(/\/-\/user\/org\.couchdb\.user:([^/]+)/);
	if (loginMatch) return loginMatch[1];
	return ANONYMOUS_USER;
}
function resolveStorage(storage) {
	if (typeof storage?.logActivity === "function" || typeof storage?.incrementDownloads === "function") return storage;
	const plugin = storage?.localStorage?.getStoragePlugin?.();
	if (plugin && (typeof plugin.logActivity === "function" || typeof plugin.incrementDownloads === "function")) return plugin;
	return storage;
}
var eventLog = (storage, logger) => {
	return (req, res, next) => {
		const command = isTarballPath(req.path) ? "tarball" : req.get(APM_COMMAND_HEADER);
		debug$3("command %o", command);
		if (!command || !VALID_EVENTS.has(command)) {
			next();
			return;
		}
		const method = toMethod(req.method);
		if (!method) {
			next();
			return;
		}
		const { name, version } = parsePackageFromUrl(req.path);
		const user = resolveUser(req);
		const store = resolveStorage(storage);
		if (typeof store.logActivity === "function") {
			debug$3("logging activity %o", {
				command,
				name,
				version
			});
			store.logActivity(user, method, command, name, version).catch((error) => {
				const errorMsg = error instanceof Error ? error.message : String(error);
				logger.error({
					error: errorMsg,
					command,
					name,
					version
				}, "failed to log activity");
			});
		}
		if (typeof store.incrementDownloads === "function" && command === "tarball") {
			const filename = tarballFilenameFromPath(req.path);
			if (filename) {
				debug$3("incrementing downloads %o", { filename });
				store.incrementDownloads(filename).catch((error) => {
					const errorMsg = error instanceof Error ? error.message : String(error);
					logger.error({
						error: errorMsg,
						filename
					}, "failed to increment downloads");
				});
			}
		}
		next();
	};
};
//#endregion
//#region src/middlewares/user-agent-filter.ts
var debug$2 = (0, debug.default)("verdaccio:plugin:pro:middleware:user-agent");
var userAgentFilter = (pattern) => {
	let regex;
	try {
		regex = new RegExp(pattern);
	} catch {
		throw _verdaccio_core.errorUtils.getInternalError(`Invalid userAgent regex: ${pattern}`);
	}
	return (req, _res, next) => {
		const userAgent = req.get("user-agent") ?? "";
		if (!regex.test(userAgent)) {
			debug$2("rejected user-agent %o", userAgent);
			next(_verdaccio_core.errorUtils.getForbidden("User-Agent not allowed"));
			return;
		}
		next();
	};
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
	register_middlewares(app, _auth, storage) {
		if (!this.middlewareConfig.enabled) return;
		debug$1("Verdaccio Pro Middleware plugin is enabled");
		const c = this.middlewareConfig;
		if (c.securityHeaders !== false) app.use(setSecurityHeaders(c.corsAllowedOrigins));
		if (c.prototypePollutionProtection !== false) app.use(prototypePollutionProtection(this.config));
		if (c.blockUnwantedRequests !== false) app.use(blockUnwantedRequests);
		if (c.userAgent) app.use(userAgentFilter(c.userAgent));
		if (c.profanityFilter !== false) app.use(profanityFilter);
		if (c.blacklistFilter !== false) app.use(blacklistFilter);
		if (c.eventLog !== false) app.use(eventLog(storage, this.logger));
		if (c.redirectNpmStyleUrl !== false) app.use("/package/{*all}", redirectNpmStyleUrl(this.logger));
	}
};
//#endregion
//#region src/index.ts
var src_default = MiddlewarePlugin;
//#endregion
exports.MiddlewarePlugin = MiddlewarePlugin;
exports.default = src_default;
