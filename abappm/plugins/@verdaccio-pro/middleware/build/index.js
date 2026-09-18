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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
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
let node_crypto = require("node:crypto");
let node_fs_promises = require("node:fs/promises");
let node_path = require("node:path");
node_path = __toESM(node_path);
let node_fs = require("node:fs");
//#region src/middlewares/security-headers.ts
var PUBLIC_CORS_METHODS = ["GET", "HEAD"];
var TRUSTED_CORS_METHODS = [
	"GET",
	"HEAD",
	"PUT",
	"POST",
	"DELETE"
];
var PUBLIC_CORS_HEADERS = [
	"Accept",
	"Content-Type",
	"Origin"
];
var TRUSTED_CORS_HEADERS = [
	"Accept",
	"Authorization",
	"Content-Encoding",
	"Content-Type",
	"Origin",
	"X-Requested-With"
];
var CORS_EXPOSE = "Content-Length, Content-Type, Content-Encoding, ETag, Last-Modified";
var CORS_MAX_AGE = "86400";
var CORS_RESPONSE_HEADERS = [
	"Access-Control-Allow-Credentials",
	"Access-Control-Allow-Headers",
	"Access-Control-Allow-Methods",
	"Access-Control-Allow-Origin",
	"Access-Control-Expose-Headers",
	"Access-Control-Max-Age"
];
var parseOrigin = (origin) => {
	try {
		const url = new URL(origin);
		return url.protocol === "http:" || url.protocol === "https:" ? url.origin : void 0;
	} catch {
		return;
	}
};
var normalizeAllowedOrigin = (origin) => {
	const normalizedOrigin = parseOrigin(origin);
	if (!normalizedOrigin) throw new TypeError(`Invalid CORS origin: ${origin}`);
	return normalizedOrigin;
};
var parseRequestedHeaders = (value) => value ? value.split(",").map((header) => header.trim().toLowerCase()).filter(Boolean) : [];
var includesAll = (allowed, requested) => {
	const normalizedAllowed = new Set(allowed.map((header) => header.toLowerCase()));
	return requested.every((header) => normalizedAllowed.has(header));
};
var setCorsOrigin = (res, origin, trusted) => {
	res.setHeader("Access-Control-Allow-Origin", trusted ? origin : "*");
	if (trusted) res.setHeader("Access-Control-Allow-Credentials", "true");
};
var clearCorsHeaders = (res) => {
	for (const header of CORS_RESPONSE_HEADERS) res.removeHeader(header);
};
var setSecurityHeaders = (allowedOrigins = []) => {
	const allowlist = new Set(allowedOrigins.map(normalizeAllowedOrigin));
	return (req, res, next) => {
		clearCorsHeaders(res);
		const origin = req.get("Origin");
		const normalizedOrigin = origin ? parseOrigin(origin) : void 0;
		const trustedOrigin = normalizedOrigin !== void 0 && allowlist.has(normalizedOrigin);
		const method = req.method.toUpperCase();
		const requestedMethod = req.get("Access-Control-Request-Method")?.toUpperCase();
		const isPreflight = method === "OPTIONS" && origin !== void 0 && requestedMethod !== void 0;
		if (origin) res.vary("Origin");
		if (isPreflight) {
			const allowedMethods = trustedOrigin ? TRUSTED_CORS_METHODS : PUBLIC_CORS_METHODS;
			const allowedHeaders = trustedOrigin ? TRUSTED_CORS_HEADERS : PUBLIC_CORS_HEADERS;
			const requestedHeaders = parseRequestedHeaders(req.get("Access-Control-Request-Headers"));
			if (!(allowedMethods.some((allowedMethod) => allowedMethod === requestedMethod) && includesAll(allowedHeaders, requestedHeaders))) {
				res.status(403).end();
				return;
			}
			setCorsOrigin(res, normalizedOrigin ?? origin, trustedOrigin);
			res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", "));
			res.setHeader("Access-Control-Allow-Headers", allowedHeaders.join(", "));
			res.setHeader("Access-Control-Max-Age", CORS_MAX_AGE);
			res.status(204).end();
			return;
		}
		if (origin && (trustedOrigin || method === "GET" || method === "HEAD")) {
			setCorsOrigin(res, normalizedOrigin ?? origin, trustedOrigin);
			res.setHeader("Access-Control-Expose-Headers", CORS_EXPOSE);
		}
		if (req.protocol === "https" || req.get("X-Forwarded-Proto") === "https") res.setHeader("Strict-Transport-Security", "max-age=86400; includeSubDomains");
		res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self'; form-action 'self'; font-src 'self'; base-uri 'self'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; report-to default;");
		res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
		res.setHeader("Reporting-Endpoints", "default=\"https://csp.abappm.com/csp\"");
		res.setHeader("Permissions-Policy", "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(self), usb=(), fullscreen=(self)");
		res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
		res.setHeader("X-Permitted-Cross-Domain-Policies", "none");
		res.setHeader("X-Robots-Tag", "index, follow");
		res.setHeader("X-Powered-By", "");
		res.setHeader("X-Frame-Options", "DENY");
		res.setHeader("X-Content-Type-Options", "nosniff");
		res.setHeader("X-XSS-Protection", "1; mode=block");
		next();
	};
};
//#endregion
//#region src/middlewares/block-requests.ts
var blockUnwantedRequests = (req, res, next) => {
	const path = req.path ?? req.url?.split("?")[0] ?? "";
	if (path.includes("/robots.txt") || path.includes("/sitemap.xml")) {
		next();
		return;
	}
	if (/\.(env|php|exe|cmd|bat|sh|csh|ksh|zsh|ps1|txt|pdf|doc|docx|xls|xlsx|ppt|pptx)$/.test(path)) {
		res.status(404).send("Not Found");
		return;
	}
	const method = req.method?.toUpperCase();
	const isBlockedMethod = method === "POST" || method === "DELETE";
	const isBlockedPath = /^\/$|^\/(en|de|fr|app|api|_next)(\/|$)/.test(path);
	if (isBlockedMethod && isBlockedPath) {
		res.status(404).send("Not Found");
		return;
	}
	next();
};
//#endregion
//#region src/middlewares/redirect-npm.ts
var debug$8 = (0, debug.default)("verdaccio:plugin:PRO:middleware");
var redirectNpmStyleUrl = (logger) => {
	return (req, res, _next) => {
		let packageName = req.params.all;
		if (Array.isArray(packageName)) packageName = packageName.join("/");
		if (!packageName) {
			res.status(404).send("Not Found");
			return;
		}
		debug$8("redirect from %o", req.url);
		const redirectTo = "/-/web/detail/" + packageName;
		logger.info({ redirectTo }, "Redirecting to @{redirectTo}");
		debug$8("redirect to %o", redirectTo);
		res.redirect(redirectTo);
	};
};
//#endregion
//#region src/middlewares/redirect-robots.ts
var redirectRobotsTxt = (_req, res) => {
	res.redirect("/-/assets/robots.txt");
};
//#endregion
//#region src/middlewares/generate-sitemap.ts
var debug$7 = (0, debug.default)("verdaccio:plugin:PRO:middleware");
function resolveStorage$1(storage) {
	if (typeof storage?.get === "function") return storage;
	const plugin = storage?.localStorage?.getStoragePlugin?.();
	if (plugin && typeof plugin.get === "function") return plugin;
	return storage;
}
function getBaseUrl(req) {
	const forwardedProto = req.get("x-forwarded-proto");
	const forwardedHost = req.get("x-forwarded-host");
	const protocol = forwardedProto?.split(",")[0]?.trim() || req.protocol || "http";
	const host = forwardedHost?.split(",")[0]?.trim() || req.get("host");
	return host ? `${protocol}://${host}` : "";
}
function escapeXml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
function buildPackageUrl(packageName) {
	return `/-/web/detail/${packageName.split("/").map((segment) => encodeURIComponent(segment)).join("/")}`;
}
function buildSitemapXml(baseUrl, packageNames) {
	return [
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
		"<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
		[baseUrl, ...packageNames.map((packageName) => `${baseUrl}${buildPackageUrl(packageName)}`)].map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n"),
		"</urlset>"
	].join("\n");
}
var generateSitemap = (storage, logger) => {
	return async (req, res) => {
		try {
			const sitemap = buildSitemapXml(getBaseUrl(req), await resolveStorage$1(storage).get());
			res.setHeader("Content-Type", "application/xml; charset=utf-8");
			res.send(sitemap);
		} catch (error) {
			logger.error({ error }, "Failed to generate sitemap");
			debug$7("failed to generate sitemap: %o", error);
			res.status(500).send("Failed to generate sitemap");
		}
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
var debug$6 = (0, debug.default)("verdaccio:plugin:PRO:middleware:profanity");
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
		debug$6("request body contained profanity");
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
var debug$5 = (0, debug.default)("verdaccio:plugin:PRO:middleware:blacklist");
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
		debug$5("request body contained a blocked URL");
		res.status(400).send("Bad Request");
		return;
	}
	next();
};
//#endregion
//#region src/middlewares/event-log.ts
var debug$4 = (0, debug.default)("verdaccio:plugin:PRO:middleware:event-log");
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
		if (!command || !VALID_EVENTS.has(command)) {
			next();
			return;
		}
		const method = toMethod(req.method);
		if (!method) {
			next();
			return;
		}
		debug$4("command %o", command);
		const { name, version } = parsePackageFromUrl(req.path);
		const user = resolveUser(req);
		const store = resolveStorage(storage);
		if (typeof store.logActivity === "function") {
			debug$4("logging activity %o", {
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
				debug$4("incrementing downloads %o", { filename });
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
//#region src/middlewares/http-log.ts
var debug$3 = (0, debug.default)("verdaccio:plugin:PRO:middleware:http-log");
var HTTP_LOG_DIR = "http-logs";
function requestPath(req) {
	return req.originalUrl ?? req.url;
}
function serializeBody(body) {
	if (body === void 0 || body === null) return "";
	if (typeof body === "string") return body;
	if (Buffer.isBuffer(body)) return body.toString("utf8");
	return JSON.stringify(body);
}
function parseBody(body) {
	if (body === void 0 || body === null || body === "") return body ?? null;
	if (typeof body === "string") try {
		return JSON.parse(body);
	} catch {
		return body;
	}
	return body;
}
function fingerprint(method, requestPathValue, body) {
	return `${method}\0${requestPathValue}\0${body}`;
}
function timestampForFilename(date) {
	return date.toISOString().replace(/[:.]/g, "-");
}
function safeFilenamePart(value) {
	return value.replace(/[^a-zA-Z0-9._@-]/g, "_");
}
function resolveUsername(req) {
	if (req.remote_user?.name) return req.remote_user.name;
	return null;
}
function resolveLogDir(config) {
	const baseDir = config.configPath ? node_path.default.dirname(config.configPath) : process.cwd();
	return node_path.default.join(baseDir, HTTP_LOG_DIR);
}
var httpLog = (config, logger) => {
	const logDir = resolveLogDir(config);
	const seen = /* @__PURE__ */ new Set();
	let dirReady = null;
	const ensureLogDir = () => {
		if (!dirReady) {
			dirReady = (0, node_fs_promises.mkdir)(logDir, { recursive: true }).then(() => void 0);
			debug$3("created log directory %s", logDir);
		}
		return dirReady;
	};
	return (req, _res, next) => {
		if ((/* @__PURE__ */ new RegExp("^(/$|/-/ping|/-/static|/-/assets|/-/verdaccio/data)")).test(req.path)) {
			next();
			return;
		}
		const method = req.method;
		const requestPathValue = requestPath(req);
		const key = fingerprint(method, requestPathValue, serializeBody(req.body));
		if (seen.has(key)) {
			next();
			return;
		}
		seen.add(key);
		const now = /* @__PURE__ */ new Date();
		const hash = (0, node_crypto.createHash)("sha256").update(key).digest("hex").slice(0, 8);
		const username = resolveUsername(req);
		const filename = username ? `${timestampForFilename(now)}-${safeFilenamePart(username)}-${hash}.json` : `${timestampForFilename(now)}-${hash}.json`;
		const filePath = node_path.default.join(logDir, filename);
		const { pathname, search } = new URL(req.protocol + "://" + req.get("host") + req.originalUrl);
		const query = search ? Object.fromEntries(new URLSearchParams(search).entries()) : "";
		const payload = {
			timestamp: now.toISOString(),
			userAgent: req.get("user-agent"),
			auth: req.get("authorization"),
			method,
			path: pathname,
			query,
			body: parseBody(req.body)
		};
		ensureLogDir().then(() => (0, node_fs_promises.writeFile)(filePath, JSON.stringify(payload, null, 2) + "\n", "utf8")).then(() => {
			debug$3("logged request %o", {
				filePath,
				method,
				path: requestPathValue
			});
		}).catch((error) => {
			seen.delete(key);
			const errorMsg = error instanceof Error ? error.message : String(error);
			logger.error({
				error: errorMsg,
				method,
				path: requestPathValue
			}, "failed to write http log");
		});
		next();
	};
};
//#endregion
//#region src/middlewares/user-agent-filter.ts
var debug$2 = (0, debug.default)("verdaccio:plugin:PRO:middleware:user-agent");
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
//#region src/middlewares/killswitch.ts
/**
* Returns a request handler that exits the process after acknowledging the request.
* Mount behind authentication at `GET /-/_kill`.
*/
var createKillswitch = (exit = (code) => {
	process.exit(code);
}) => {
	return (_req, res) => {
		res.status(200).send({
			ok: true,
			crashing: true
		});
		setTimeout(() => {
			exit(1);
		}, 5e3);
	};
};
//#endregion
//#region src/middlewares/build-info.ts
var BUILD_INFO_KEYS = [
	"BUILD_DATE",
	"BUILD_SHA",
	"NODE_VERSION",
	"VERDACCIO_VERSION"
];
function getBuildInfoFromEnv(env = process.env) {
	return BUILD_INFO_KEYS.reduce((buildInfos, key) => {
		buildInfos[key] = env[key] ?? null;
		return buildInfos;
	}, {});
}
function buildInfo(_req, res) {
	res.send({ env: getBuildInfoFromEnv() });
}
//#endregion
//#region src/middlewares/basic-auth.ts
var DASHBOARD_AUTH_REALM = "Verdaccio Pro Dashboard";
var DASHBOARD_USER_ENV = "VERDACCIO_DASHBOARD_USER";
var DASHBOARD_PASSWORD_ENV = "VERDACCIO_DASHBOARD_PASSWORD";
function digest(value) {
	return (0, node_crypto.createHash)("sha256").update(value).digest();
}
function parseCredentials(authorization) {
	if (!authorization?.toLowerCase().startsWith("basic ")) return null;
	try {
		const decoded = Buffer.from(authorization.slice(6).trim(), "base64").toString("utf8");
		const separator = decoded.indexOf(":");
		if (separator < 0) return null;
		return {
			user: decoded.slice(0, separator),
			password: decoded.slice(separator + 1)
		};
	} catch {
		return null;
	}
}
function unauthorized(res) {
	res.setHeader("Cache-Control", "no-store");
	res.setHeader("WWW-Authenticate", `Basic realm="${DASHBOARD_AUTH_REALM}", charset="UTF-8"`);
	res.status(401).send("Unauthorized");
}
function requireBasicAuth(options = {
	user: process.env[DASHBOARD_USER_ENV],
	password: process.env[DASHBOARD_PASSWORD_ENV]
}) {
	const expectedUser = options.user;
	const expectedPassword = options.password;
	if (!expectedUser || !expectedPassword) throw new Error(`${DASHBOARD_USER_ENV} and ${DASHBOARD_PASSWORD_ENV} must be set`);
	const expectedUserDigest = digest(expectedUser);
	const expectedPasswordDigest = digest(expectedPassword);
	return (req, res, next) => {
		const credentials = parseCredentials(req.headers.authorization);
		const userMatches = (0, node_crypto.timingSafeEqual)(digest(credentials?.user ?? ""), expectedUserDigest);
		const passwordMatches = (0, node_crypto.timingSafeEqual)(digest(credentials?.password ?? ""), expectedPasswordDigest);
		if (!userMatches || !passwordMatches) {
			unauthorized(res);
			return;
		}
		res.setHeader("Cache-Control", "no-store");
		next();
	};
}
//#endregion
//#region src/middlewares/dashboard.ts
var MAX_FILE_BYTES = 1048576;
var DASHBOARD_PATH = "/-/_dashboard";
var TEXT_EXTENSIONS = /* @__PURE__ */ new Set([
	".yml",
	".yaml",
	".js",
	".cjs",
	".mjs",
	".ts",
	".cts",
	".mts",
	".json",
	".json5",
	".log",
	".txt",
	".md",
	".markdown",
	".xml",
	".html",
	".htm",
	".css",
	".scss",
	".less",
	".ini",
	".conf",
	".cfg",
	".sh",
	".bash",
	".zsh",
	".ps1",
	".bat",
	".cmd",
	".toml",
	".csv",
	".svg"
]);
var TEXT_BASENAMES = /* @__PURE__ */ new Set([
	"dockerfile",
	"makefile",
	"license",
	"licence",
	"readme",
	"changelog",
	"authors",
	"contributors",
	"gemfile",
	"rakefile",
	"procfile"
]);
var BrowserError = class extends Error {
	constructor(status, message) {
		super(message);
		this.status = status;
	}
};
function escapeHtml(value) {
	return String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function isWithinRoot(root, candidate) {
	const relative = node_path.default.relative(root, candidate);
	return relative === "" || !relative.startsWith("..") && !node_path.default.isAbsolute(relative);
}
function isAllowedTextFile(filePath) {
	const base = node_path.default.basename(filePath).toLowerCase();
	return TEXT_EXTENSIONS.has(node_path.default.extname(base)) || TEXT_BASENAMES.has(base);
}
async function browse(rootDir, requestedPath, maxFileBytes) {
	const root = await node_fs.promises.realpath(rootDir);
	const lexicalPath = node_path.default.resolve(root, requestedPath || ".");
	if (!isWithinRoot(root, lexicalPath)) throw new BrowserError(400, "Invalid path");
	let absolutePath;
	try {
		absolutePath = await node_fs.promises.realpath(lexicalPath);
	} catch {
		throw new BrowserError(404, "Not found");
	}
	if (!isWithinRoot(root, absolutePath)) throw new BrowserError(400, "Invalid path");
	const stats = await node_fs.promises.stat(absolutePath);
	const relativePath = node_path.default.relative(root, absolutePath).split(node_path.default.sep).join("/") || ".";
	if (stats.isDirectory()) {
		const names = await node_fs.promises.readdir(absolutePath);
		const entries = await Promise.all(names.map(async (name) => {
			const entryPath = node_path.default.join(absolutePath, name);
			try {
				const entryStats = await node_fs.promises.lstat(entryPath);
				if (entryStats.isSymbolicLink()) return {
					name,
					type: "unknown"
				};
				if (entryStats.isDirectory()) return {
					name,
					type: "directory",
					modified: entryStats.mtime.toISOString()
				};
				if (entryStats.isFile()) return {
					name,
					type: "file",
					size: entryStats.size,
					modified: entryStats.mtime.toISOString(),
					readable: isAllowedTextFile(name)
				};
				return {
					name,
					type: "unknown"
				};
			} catch {
				return {
					name,
					type: "unknown"
				};
			}
		}));
		entries.sort((left, right) => {
			if (left.type === "directory" && right.type !== "directory") return -1;
			if (left.type !== "directory" && right.type === "directory") return 1;
			return left.name.localeCompare(right.name);
		});
		return {
			type: "directory",
			path: relativePath,
			entries
		};
	}
	if (!stats.isFile()) throw new BrowserError(400, "Unsupported path type");
	if (!isAllowedTextFile(absolutePath)) throw new BrowserError(415, "File type not allowed");
	if (stats.size > maxFileBytes) throw new BrowserError(413, `File is larger than ${formatBytes(maxFileBytes)}`);
	return {
		type: "file",
		path: relativePath,
		size: stats.size,
		modified: stats.mtime.toISOString(),
		content: await node_fs.promises.readFile(absolutePath, "utf8")
	};
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
function formatDuration(seconds) {
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor(seconds % 86400 / 3600);
	const minutes = Math.floor(seconds % 3600 / 60);
	return [
		days ? `${days}d` : "",
		hours ? `${hours}h` : "",
		`${minutes}m`
	].filter(Boolean).join(" ");
}
function fileHref(relativePath) {
	return `${DASHBOARD_PATH}?path=${encodeURIComponent(relativePath)}`;
}
function renderBrowser(result) {
	if (result.type === "file") {
		const parent = node_path.default.posix.dirname(result.path);
		return `<section class="panel"><div class="browser-head"><h2>${escapeHtml(result.path)}</h2><a href="${fileHref(parent)}">Parent directory</a></div><p class="muted">${formatBytes(result.size)} · ${escapeHtml(result.modified)}</p><pre>${escapeHtml(result.content)}</pre></section>`;
	}
	const parent = result.path === "." ? null : node_path.default.posix.dirname(result.path);
	const rows = [parent == null ? "" : `<tr><td><a href="${fileHref(parent)}">../</a></td><td>directory</td><td>—</td><td>—</td></tr>`, ...result.entries.map((entry) => {
		const childPath = result.path === "." ? entry.name : `${result.path}/${entry.name}`;
		const canOpen = entry.type === "directory" || entry.type === "file" && entry.readable;
		const name = `${escapeHtml(entry.name)}${entry.type === "directory" ? "/" : ""}`;
		return `<tr><td>${canOpen ? `<a href="${fileHref(childPath)}">${name}</a>` : name}</td><td>${entry.type}</td><td>${entry.size == null ? "—" : formatBytes(entry.size)}</td><td>${escapeHtml(entry.modified ?? "—")}</td></tr>`;
	})].join("");
	return `<section class="panel"><div class="browser-head"><h2>Files / ${escapeHtml(result.path)}</h2><span class="muted">Text files up to ${formatBytes(MAX_FILE_BYTES)}</span></div><table><thead><tr><th>Name</th><th>Type</th><th>Size</th><th>Modified</th></tr></thead><tbody>${rows}</tbody></table></section>`;
}
function resolveStatsStorage(storage) {
	if (typeof storage.get === "function") return storage;
	return storage.getStoragePlugin?.() ?? storage.localStorage?.getStoragePlugin?.() ?? storage;
}
async function getRegistryStats(storage, now) {
	const statsStorage = resolveStatsStorage(storage);
	if (typeof statsStorage.get !== "function") throw new Error("Registry storage statistics are unavailable");
	const packages = await statsStorage.get();
	if (typeof statsStorage.getDownloads !== "function") return {
		packages: packages.length,
		downloads: null
	};
	const end = now.toISOString().slice(0, 10);
	const startDate = new Date(now);
	startDate.setUTCDate(startDate.getUTCDate() - 29);
	const downloads = await statsStorage.getDownloads("d", startDate.toISOString().slice(0, 10), end);
	return {
		packages: packages.length,
		downloads: downloads?.reduce((total, row) => total + row.count, 0) ?? 0
	};
}
function createDashboard(storage, options = {}) {
	const env = options.env ?? process.env;
	const rootDir = options.rootDir ?? env["VERDACCIO_DASHBOARD_ROOT"] ?? process.cwd();
	const maxFileBytes = options.maxFileBytes ?? MAX_FILE_BYTES;
	const now = options.now ?? (() => /* @__PURE__ */ new Date());
	const uptime = options.uptime ?? process.uptime;
	const memoryUsage = options.memoryUsage ?? process.memoryUsage;
	return async (req, res) => {
		const requestedPath = typeof req.query.path === "string" ? req.query.path : ".";
		const currentTime = now();
		const [statsResult, browserResult] = await Promise.allSettled([getRegistryStats(storage, currentTime), browse(rootDir, requestedPath, maxFileBytes)]);
		const build = getBuildInfoFromEnv(env);
		const memory = memoryUsage();
		const registryStats = statsResult.status === "fulfilled" ? statsResult.value : {
			packages: 0,
			downloads: null
		};
		const browserHtml = browserResult.status === "fulfilled" ? renderBrowser(browserResult.value) : `<section class="panel error"><h2>Files</h2><p>${escapeHtml(browserResult.reason instanceof Error ? browserResult.reason.message : "Unable to browse files")}</p></section>`;
		res.setHeader("Content-Type", "text/html; charset=utf-8");
		res.status(browserResult.status === "rejected" && browserResult.reason instanceof BrowserError ? browserResult.reason.status : 200);
		res.send(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Verdaccio Pro Dashboard</title><style>
:root{color-scheme:dark;background:#101410;color:#ecf3ec;font-family:ui-monospace,SFMono-Regular,Consolas,monospace}*{box-sizing:border-box}body{margin:0;background:#101410}main{max-width:1180px;margin:auto;padding:32px 20px 64px}header{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:24px}h1,h2{margin:0}h1{font-size:28px}h2{font-size:16px}.eyebrow,.muted{color:#9aac9a}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:12px;margin-bottom:8px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;margin-bottom:12px}.card,.panel{background:#182018;border:1px solid #354535;border-radius:8px}.card{padding:18px}.card strong{display:block;font-size:24px;margin-top:10px}.panel{padding:20px;margin-top:12px;overflow:auto}.build{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}.build div{border-left:2px solid #cd4000;padding-left:12px}.build span{display:block;color:#9aac9a;font-size:12px;margin-bottom:5px}.browser-head{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px}table{border-collapse:collapse;width:100%;min-width:680px}th,td{text-align:left;border-bottom:1px solid #2d392d;padding:10px 8px}th{color:#9aac9a;font-size:12px;text-transform:uppercase}a{color:#9bd49b;text-decoration:none}a:hover{text-decoration:underline}pre{white-space:pre-wrap;word-break:break-word;background:#0b0e0b;border:1px solid #2d392d;padding:16px;border-radius:6px;line-height:1.5}.error{border-color:#8f4545;color:#ffb7b7}@media(max-width:650px){header,.browser-head{align-items:flex-start;flex-direction:column}}
</style></head><body><main><header><div><div class="eyebrow">Verdaccio Pro</div><h1>Registry dashboard</h1></div><div class="muted">${escapeHtml(currentTime.toISOString())}</div></header>
<section class="grid"><div class="card"><span class="muted">Local packages</span><strong>${registryStats.packages}</strong></div><div class="card"><span class="muted">Downloads · 30 days</span><strong>${registryStats.downloads ?? "n/a"}</strong></div><div class="card"><span class="muted">Uptime</span><strong>${escapeHtml(formatDuration(uptime()))}</strong></div><div class="card"><span class="muted">Memory RSS</span><strong>${formatBytes(memory.rss)}</strong></div></section>
<section class="panel"><div class="browser-head"><h2>Build information</h2><a href="${DASHBOARD_PATH}">Dashboard root</a></div><div class="build">${Object.entries(build).map(([key, value]) => `<div><span>${escapeHtml(key)}</span>${escapeHtml(value ?? "not set")}</div>`).join("")}</div></section>${browserHtml}</main></body></html>`);
	};
}
//#endregion
//#region src/plugin.ts
var debug$1 = (0, debug.default)("verdaccio:plugin:PRO:middleware");
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
		if (c.blockUnwantedRequests !== false) app.use(blockUnwantedRequests);
		if (c.securityHeaders !== false) app.use(setSecurityHeaders(c.corsAllowedOrigins));
		if (c.prototypePollutionProtection !== false) app.use(prototypePollutionProtection(this.config));
		if (c.httpLog !== false) app.use(httpLog(this.config, this.logger));
		if (c.userAgent) app.use(userAgentFilter(c.userAgent));
		if (c.profanityFilter !== false) app.use(profanityFilter);
		if (c.blacklistFilter !== false) app.use(blacklistFilter);
		if (c.eventLog !== false) app.use(eventLog(storage, this.logger));
		if (c.redirectNpmStyleUrl !== false) app.use("/package/{*all}", redirectNpmStyleUrl(this.logger));
		app.get("/robots.txt", redirectRobotsTxt);
		app.get("/sitemap.xml", generateSitemap(storage, this.logger));
		const dashboardAuth = requireBasicAuth();
		const dashboard = createDashboard(storage);
		app.get("/-/_dashboard", dashboardAuth, dashboard);
		app.get("/-/_build", dashboardAuth, buildInfo);
		app.get("/-/_kill", dashboardAuth, createKillswitch());
		app.get("/-/_files", dashboardAuth, dashboard);
	}
};
//#endregion
//#region src/index.ts
var src_default = MiddlewarePlugin;
//#endregion
exports.MiddlewarePlugin = MiddlewarePlugin;
exports.default = src_default;
