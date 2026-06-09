Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
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
let node_fs = require("node:fs");
let node_path = require("node:path");
let drizzle_orm_node_postgres = require("drizzle-orm/node-postgres");
let dotenv = require("dotenv");
let zod = require("zod");
zod = __toESM(zod);
let drizzle_orm_logger = require("drizzle-orm/logger");
let drizzle_orm = require("drizzle-orm");
let drizzle_orm_pg_core = require("drizzle-orm/pg-core");
let debug = require("debug");
debug = __toESM(debug);
let _verdaccio_core = require("@verdaccio/core");
let stream = require("stream");
let node_crypto = require("node:crypto");
let node_util = require("node:util");
//#region src/env.ts
var stringBoolean = zod.default.coerce.string().transform((val) => {
	return val === "true";
}).default(false);
var envSchema = zod.default.object({
	NODE_ENV: zod.default.string().default("development"),
	DATABASE_SECRET: zod.default.string().trim().min(1).default("caramelicecream"),
	DATABASE_URL: zod.default.string().trim().min(1).default("localhost"),
	DB_POOL_SIZE: zod.default.coerce.number().default(22),
	DB_SSL: stringBoolean.default(true),
	DB_SSL_REJECT_UNAUTHORIZED: stringBoolean.default(false),
	DB_SSL_CA_PATH: zod.default.string().trim().optional(),
	DB_SSL_CERT_PATH: zod.default.string().trim().optional(),
	DB_SSL_KEY_PATH: zod.default.string().trim().optional(),
	DB_SSL_CA: zod.default.string().trim().optional(),
	DB_SSL_CERT: zod.default.string().trim().optional(),
	DB_SSL_KEY: zod.default.string().trim().optional(),
	DB_LOGGING: stringBoolean.default(false),
	DB_MIGRATING: stringBoolean.default(false),
	DB_SEEDING: stringBoolean.default(false),
	DB_RESET: stringBoolean.default(false),
	DB_EXPORTING: stringBoolean.default(false),
	DB_IMPORTING: stringBoolean.default(false),
	DB_DATA_DIR: zod.default.string().default("sql/data"),
	DB_FALLBACK: stringBoolean.default(false),
	DB_SALT: zod.default.string().default("saltypretzel")
});
(0, dotenv.config)({
	debug: false,
	quiet: true
});
var envServer = envSchema.safeParse({
	NODE_ENV: process.env.NODE_ENV,
	DATABASE_SECRET: process.env.DATABASE_SECRET,
	DATABASE_URL: process.env.DATABASE_URL,
	DB_POOL_SIZE: process.env.DB_POOL_SIZE,
	DB_SSL: process.env.DB_SSL,
	DB_SSL_REJECT_UNAUTHORIZED: process.env.DB_SSL_REJECT_UNAUTHORIZED,
	DB_SSL_CA_PATH: process.env.DB_SSL_CA_PATH,
	DB_SSL_CERT_PATH: process.env.DB_SSL_CERT_PATH,
	DB_SSL_KEY_PATH: process.env.DB_SSL_KEY_PATH,
	DB_SSL_CA: process.env.DB_SSL_CA,
	DB_SSL_CERT: process.env.DB_SSL_CERT,
	DB_SSL_KEY: process.env.DB_SSL_KEY,
	DB_LOGGING: process.env.DB_LOGGING,
	DB_MIGRATING: process.env.DB_MIGRATING,
	DB_SEEDING: process.env.DB_SEEDING,
	DB_RESET: process.env.DB_RESET,
	DB_EXPORTING: process.env.DB_EXPORTING,
	DB_IMPORTING: process.env.DB_IMPORTING,
	DB_DATA_DIR: process.env.DB_DATA_DIR,
	DB_FALLBACK: process.env.DB_FALLBACK,
	DB_SALT: process.env.DB_SALT
});
if (!envServer.success) throw new Error(envServer.error.message);
var ENV = envSchema.parse(process.env);
var RESET = "\x1B[0m";
//#endregion
//#region src/db/logger.ts
var VerdaccioLogWriter = class {
	constructor(logger) {
		this.logger = logger;
	}
	write(message) {
		let msg = message.replace(/^Query:\s*/i, "");
		if (msg.length > 500) msg = msg.substring(0, 497) + "...";
		if (msg.includes("users") || msg.includes("user_secrets") || msg.includes("secrets") || msg.includes("tokens")) msg = msg.split(" ")[0] + "<Classified>";
		const coloredMsg = msg.replace(/^(\w+)/i, (_, word) => {
			return `${{
				select: "\x1B[36m",
				insert: "\x1B[34m",
				update: "\x1B[32m",
				delete: "\x1B[35m",
				truncate: "\x1B[31m"
			}[word.toLowerCase()] || "\x1B[33m"}${word}${RESET}`;
		});
		this.logger.info(`SQL: ${coloredMsg}`);
	}
};
var loggerFactory = (logger) => {
	return logger ? new drizzle_orm_logger.DefaultLogger({ writer: new VerdaccioLogWriter(logger) }) : void 0;
};
//#endregion
//#region src/db/index.ts
var getDatabase = (url, logger) => {
	const drizzleLogger = loggerFactory(logger);
	const sslConfig = ENV.DB_SSL ? {
		rejectUnauthorized: ENV.DB_SSL_REJECT_UNAUTHORIZED,
		ca: ENV.DB_SSL_CA_PATH ? (0, node_fs.readFileSync)((0, node_path.resolve)(ENV.DB_SSL_CA_PATH), "utf8") : ENV.DB_SSL_CA ?? void 0,
		cert: ENV.DB_SSL_CERT_PATH ? (0, node_fs.readFileSync)((0, node_path.resolve)(ENV.DB_SSL_CERT_PATH), "utf8") : ENV.DB_SSL_CERT ?? void 0,
		key: ENV.DB_SSL_KEY_PATH ? (0, node_fs.readFileSync)((0, node_path.resolve)(ENV.DB_SSL_KEY_PATH), "utf8") : ENV.DB_SSL_KEY ?? void 0
	} : false;
	return (0, drizzle_orm_node_postgres.drizzle)({
		connection: {
			connectionString: url,
			max: ENV.DATABASE_URL.includes("localhost") || ENV.DATABASE_URL.includes("127.0.0.1") || ENV.DATABASE_URL.includes("file:") || ENV.DB_MIGRATING || ENV.DB_SEEDING || ENV.DB_RESET || ENV.DB_EXPORTING || ENV.DB_IMPORTING ? 1 : ENV.DB_POOL_SIZE,
			ssl: sslConfig
		},
		logger: drizzleLogger
	});
};
//#endregion
//#region src/db/schema/index.ts
var timestamps = {
	created: (0, drizzle_orm_pg_core.timestamp)().defaultNow().notNull(),
	updated: (0, drizzle_orm_pg_core.timestamp)().defaultNow().notNull()
};
var timestampsDeleted = {
	...timestamps,
	deleted: (0, drizzle_orm_pg_core.timestamp)()
};
var permissionEnum = (0, drizzle_orm_pg_core.pgEnum)("permissions", ["r", "w"]);
var timesliceEnum = (0, drizzle_orm_pg_core.pgEnum)("timeslices", [
	"d",
	"m",
	"y",
	"t"
]);
var methodEnum = (0, drizzle_orm_pg_core.pgEnum)("methods", [
	"get",
	"post",
	"put",
	"delete"
]);
var subscriptionStatusEnum = (0, drizzle_orm_pg_core.pgEnum)("subscription_status", [
	"trialing",
	"active",
	"past_due",
	"paused",
	"canceled"
]);
var tsVector = (0, drizzle_orm_pg_core.customType)({
	dataType() {
		return "tsvector";
	},
	fromDriver(value) {
		return value;
	}
});
/**
* Users
*/
var users = (0, drizzle_orm_pg_core.pgTable)("users", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	user: (0, drizzle_orm_pg_core.text)().primaryKey(),
	fullname: (0, drizzle_orm_pg_core.text)(),
	description: (0, drizzle_orm_pg_core.text)(),
	email: (0, drizzle_orm_pg_core.text)(),
	email_verified: (0, drizzle_orm_pg_core.boolean)().notNull().default(false),
	homepage: (0, drizzle_orm_pg_core.text)(),
	github: (0, drizzle_orm_pg_core.text)(),
	links: (0, drizzle_orm_pg_core.jsonb)(),
	...timestampsDeleted
});
/**
* User Secrets
*/
var userSecrets = (0, drizzle_orm_pg_core.pgTable)("user_secrets", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	user: (0, drizzle_orm_pg_core.text)().primaryKey(),
	hash: (0, drizzle_orm_pg_core.text)().notNull(),
	email: (0, drizzle_orm_pg_core.text)().notNull(),
	...timestampsDeleted
});
/**
* Roles
*/
var roles = (0, drizzle_orm_pg_core.pgTable)("roles", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	role: (0, drizzle_orm_pg_core.text)().primaryKey(),
	description: (0, drizzle_orm_pg_core.text)(),
	...timestampsDeleted
});
/**
* Organizations
*/
var orgs = (0, drizzle_orm_pg_core.pgTable)("orgs", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org: (0, drizzle_orm_pg_core.text)().primaryKey(),
	name: (0, drizzle_orm_pg_core.text)(),
	description: (0, drizzle_orm_pg_core.text)(),
	homepage: (0, drizzle_orm_pg_core.text)(),
	github: (0, drizzle_orm_pg_core.text)(),
	links: (0, drizzle_orm_pg_core.jsonb)(),
	...timestampsDeleted
});
/**
* Organization Members
*/
var orgMembers = (0, drizzle_orm_pg_core.pgTable)("org_members", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	user_id: (0, drizzle_orm_pg_core.integer)().references(() => users.id),
	role_id: (0, drizzle_orm_pg_core.integer)().references(() => roles.id),
	...timestampsDeleted
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [
	t.org_id,
	t.user_id,
	t.role_id
] })]);
/**
* Teams
*/
var teams = (0, drizzle_orm_pg_core.pgTable)("teams", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	team: (0, drizzle_orm_pg_core.text)().notNull(),
	description: (0, drizzle_orm_pg_core.text)(),
	...timestampsDeleted
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [t.org_id, t.team] })]);
/**
* Team Members
*/
var teamMembers = (0, drizzle_orm_pg_core.pgTable)("team_members", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	team_id: (0, drizzle_orm_pg_core.integer)().references(() => teams.id),
	user_id: (0, drizzle_orm_pg_core.integer)().references(() => users.id),
	...timestampsDeleted
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [
	t.org_id,
	t.team_id,
	t.user_id
] })]);
/**
* Secrets
*/
var secrets = (0, drizzle_orm_pg_core.pgTable)("secrets", {
	name: (0, drizzle_orm_pg_core.text)().primaryKey(),
	value: (0, drizzle_orm_pg_core.text)().notNull(),
	...timestamps
});
/**
* Tokens
*/
var tokens = (0, drizzle_orm_pg_core.pgTable)("tokens", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	user: (0, drizzle_orm_pg_core.text)().notNull(),
	key: (0, drizzle_orm_pg_core.text)().notNull(),
	token: (0, drizzle_orm_pg_core.text)().notNull(),
	cidr: (0, drizzle_orm_pg_core.text)().array(),
	readonly: (0, drizzle_orm_pg_core.boolean)().notNull(),
	...timestamps
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [t.user, t.key] })]);
/**
* Local Packages
*/
var localPackages = (0, drizzle_orm_pg_core.pgTable)("local_packages", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	name: (0, drizzle_orm_pg_core.text)().notNull(),
	...timestamps
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [t.org_id, t.name] })]);
/**
* Packages
*/
var packages = (0, drizzle_orm_pg_core.pgTable)("packages", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	name: (0, drizzle_orm_pg_core.text)().notNull(),
	json: (0, drizzle_orm_pg_core.jsonb)().notNull(),
	...timestampsDeleted
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [t.org_id, t.name] })]);
/**
* Team Packages
*/
var teamPackages = (0, drizzle_orm_pg_core.pgTable)("team_packages", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	team_id: (0, drizzle_orm_pg_core.integer)().references(() => teams.id),
	package_id: (0, drizzle_orm_pg_core.integer)().references(() => packages.id),
	permission: permissionEnum().$type(),
	...timestampsDeleted
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [
	t.org_id,
	t.team_id,
	t.package_id
] })]);
/**
* Readmes
*/
var readmes = (0, drizzle_orm_pg_core.pgTable)("readmes", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	name: (0, drizzle_orm_pg_core.text)().notNull(),
	version: (0, drizzle_orm_pg_core.text)().notNull(),
	markdown: (0, drizzle_orm_pg_core.text)().notNull(),
	search_english: tsVector().generatedAlwaysAs(() => drizzle_orm.sql`to_tsvector('english', coalesce(${readmes.markdown}, ''))`),
	search_german: tsVector().generatedAlwaysAs(() => drizzle_orm.sql`to_tsvector('german', coalesce(${readmes.markdown}, ''))`),
	...timestampsDeleted
}, (t) => [
	(0, drizzle_orm_pg_core.primaryKey)({ columns: [
		t.org_id,
		t.name,
		t.version
	] }),
	(0, drizzle_orm_pg_core.index)("readme_search_english").using("gin", t.search_english),
	(0, drizzle_orm_pg_core.index)("readme_search_german").using("gin", t.search_german)
]);
/**
* Metadata
*/
var metadata = (0, drizzle_orm_pg_core.pgTable)("metadata", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	name: (0, drizzle_orm_pg_core.text)().notNull(),
	version: (0, drizzle_orm_pg_core.text)().notNull(),
	description: (0, drizzle_orm_pg_core.text)(),
	keywords: (0, drizzle_orm_pg_core.text)(),
	search_english: tsVector().generatedAlwaysAs(() => drizzle_orm.sql`
      setweight(to_tsvector('english', coalesce(${metadata.name}, '')), 'A') || ' ' ||
      setweight(to_tsvector('english', coalesce(${metadata.version}, '')), 'B') || ' ' ||
      setweight(to_tsvector('english', coalesce(${metadata.description}, '')), 'C') || ' ' ||
      setweight(to_tsvector('english', coalesce(${metadata.keywords}, '')), 'D')`),
	search_german: tsVector().generatedAlwaysAs(() => drizzle_orm.sql`
      setweight(to_tsvector('german', coalesce(${metadata.name}, '')), 'A') || ' ' ||
      setweight(to_tsvector('german', coalesce(${metadata.version}, '')), 'B') || ' ' ||
      setweight(to_tsvector('german', coalesce(${metadata.description}, '')), 'C') || ' ' ||
      setweight(to_tsvector('german', coalesce(${metadata.keywords}, '')), 'D')`),
	...timestampsDeleted
}, (t) => [
	(0, drizzle_orm_pg_core.primaryKey)({ columns: [
		t.org_id,
		t.name,
		t.version
	] }),
	(0, drizzle_orm_pg_core.index)("metadata_search_english").using("gin", t.search_english),
	(0, drizzle_orm_pg_core.index)("metadata_search_german").using("gin", t.search_german)
]);
/**
* Dist Tags
*/
var distTags = (0, drizzle_orm_pg_core.pgTable)("dist_tags", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	name: (0, drizzle_orm_pg_core.text)().notNull(),
	tag: (0, drizzle_orm_pg_core.text)().notNull(),
	version: (0, drizzle_orm_pg_core.text)().notNull(),
	...timestamps
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [
	t.org_id,
	t.name,
	t.tag,
	t.version
] })]);
/**
* Tarballs
*/
var tarballs = (0, drizzle_orm_pg_core.pgTable)("tarballs", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	name: (0, drizzle_orm_pg_core.text)().notNull(),
	version: (0, drizzle_orm_pg_core.text)().notNull(),
	filename: (0, drizzle_orm_pg_core.text)().notNull(),
	data: (0, drizzle_orm_pg_core.bytea)().notNull(),
	size: (0, drizzle_orm_pg_core.integer)().notNull(),
	...timestampsDeleted
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [
	t.org_id,
	t.name,
	t.version
] })]);
/**
* Downloads
*/
var downloads = (0, drizzle_orm_pg_core.pgTable)("downloads", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	timeslice: timesliceEnum().notNull().$type(),
	year: (0, drizzle_orm_pg_core.integer)(),
	month: (0, drizzle_orm_pg_core.integer)(),
	date: (0, drizzle_orm_pg_core.date)(),
	name: (0, drizzle_orm_pg_core.text)(),
	version: (0, drizzle_orm_pg_core.text)(),
	count: (0, drizzle_orm_pg_core.integer)().notNull()
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [
	t.org_id,
	t.timeslice,
	t.year,
	t.month,
	t.date,
	t.name,
	t.version
] })]);
/**
* Events
*/
var events = (0, drizzle_orm_pg_core.pgTable)("events", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	event: (0, drizzle_orm_pg_core.text)().notNull()
});
/**
* Event Log
*/
var eventLog = (0, drizzle_orm_pg_core.pgTable)("event_log", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	timestamp: (0, drizzle_orm_pg_core.timestamp)().defaultNow().notNull(),
	user_id: (0, drizzle_orm_pg_core.integer)().references(() => users.id),
	method: methodEnum().notNull(),
	event_id: (0, drizzle_orm_pg_core.integer)().references(() => events.id),
	name: (0, drizzle_orm_pg_core.text)(),
	version: (0, drizzle_orm_pg_core.text)()
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [
	t.org_id,
	t.timestamp,
	t.user_id
] })]);
/**
* Clerk User Management
* https://clerk.com/
* JSON Reference
* https://github.com/clerk/javascript/blob/main/packages/types/src/json.ts
*/
/**
* Clerk Users
*/
var clerkUsers = (0, drizzle_orm_pg_core.pgTable)("clerk_users", {
	clerk_user: (0, drizzle_orm_pg_core.text)().primaryKey(),
	clerk_json: (0, drizzle_orm_pg_core.jsonb)(),
	user_id: (0, drizzle_orm_pg_core.integer)().references(() => users.id),
	user: (0, drizzle_orm_pg_core.text)().references(() => users.user),
	...timestampsDeleted
});
/**
* Clerk Organizations
*/
var clerkOrgs = (0, drizzle_orm_pg_core.pgTable)("clerk_orgs", {
	clerk_org: (0, drizzle_orm_pg_core.text)().primaryKey(),
	clerk_json: (0, drizzle_orm_pg_core.jsonb)(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	org: (0, drizzle_orm_pg_core.text)().references(() => orgs.org),
	...timestampsDeleted
});
/**
* Clerk Organization Members
*/
var clerkMembers = (0, drizzle_orm_pg_core.pgTable)("clerk_members", {
	clerk_member: (0, drizzle_orm_pg_core.text)().primaryKey(),
	clerk_json: (0, drizzle_orm_pg_core.jsonb)(),
	clerk_org: (0, drizzle_orm_pg_core.text)().references(() => clerkOrgs.clerk_org),
	clerk_user: (0, drizzle_orm_pg_core.text)().references(() => clerkUsers.clerk_user),
	role: (0, drizzle_orm_pg_core.text)().references(() => roles.role),
	...timestampsDeleted
});
/**
* Clerk Events
*/
var clerkEvents = (0, drizzle_orm_pg_core.pgTable)("clerk_events", {
	id: (0, drizzle_orm_pg_core.serial)().primaryKey(),
	event_id: (0, drizzle_orm_pg_core.text)().notNull().unique(),
	event_type: (0, drizzle_orm_pg_core.text)().notNull(),
	occurred_at: (0, drizzle_orm_pg_core.timestamp)().notNull(),
	processed_at: (0, drizzle_orm_pg_core.timestamp)().defaultNow().notNull(),
	clerk_json: (0, drizzle_orm_pg_core.jsonb)()
}, (t) => [(0, drizzle_orm_pg_core.index)("clerk_events_event_type_idx").on(t.event_type)]);
/**
* Paddle Payments
* https://paddle.com/
* API and Webhooks Reference
* https://developer.paddle.com/api-reference/
* https://developer.paddle.com/webhooks/
*/
/**
* Paddle Subscriptions
*/
var paddleSubscriptions = (0, drizzle_orm_pg_core.pgTable)("paddle_subscriptions", {
	id: (0, drizzle_orm_pg_core.serial)().primaryKey(),
	clerk_user: (0, drizzle_orm_pg_core.text)().references(() => clerkUsers.clerk_user),
	paddle_customer_id: (0, drizzle_orm_pg_core.text)(),
	paddle_subscription_id: (0, drizzle_orm_pg_core.text)().unique(),
	price_id: (0, drizzle_orm_pg_core.text)(),
	status: subscriptionStatusEnum().notNull().default("trialing"),
	current_period_end: (0, drizzle_orm_pg_core.timestamp)(),
	cancel_at_period_end: (0, drizzle_orm_pg_core.boolean)().notNull().default(false),
	paddle_json: (0, drizzle_orm_pg_core.jsonb)(),
	...timestamps
}, (t) => [
	(0, drizzle_orm_pg_core.index)("paddle_subscriptions_clerk_user_idx").on(t.clerk_user),
	(0, drizzle_orm_pg_core.index)("paddle_subscriptions_customer_id_idx").on(t.paddle_customer_id),
	(0, drizzle_orm_pg_core.index)("paddle_subscriptions_subscription_id_idx").on(t.paddle_subscription_id)
]);
/**
* Paddle Events
*/
var paddleEvents = (0, drizzle_orm_pg_core.pgTable)("paddle_events", {
	id: (0, drizzle_orm_pg_core.serial)().primaryKey(),
	event_id: (0, drizzle_orm_pg_core.text)().notNull().unique(),
	event_type: (0, drizzle_orm_pg_core.text)().notNull(),
	occurred_at: (0, drizzle_orm_pg_core.timestamp)().notNull(),
	processed_at: (0, drizzle_orm_pg_core.timestamp)().defaultNow().notNull(),
	paddle_json: (0, drizzle_orm_pg_core.jsonb)()
}, (t) => [(0, drizzle_orm_pg_core.index)("paddle_events_event_type_idx").on(t.event_type)]);
/**
* Global Object Directory (GTADIR)
*/
var gtadir = (0, drizzle_orm_pg_core.pgTable)("gtadir", {
	id: (0, drizzle_orm_pg_core.serial)().unique(),
	pgmid: (0, drizzle_orm_pg_core.text)().notNull(),
	object: (0, drizzle_orm_pg_core.text)().notNull(),
	object_name: (0, drizzle_orm_pg_core.text)().notNull(),
	org_id: (0, drizzle_orm_pg_core.integer)().references(() => orgs.id),
	name: (0, drizzle_orm_pg_core.text)().notNull(),
	version: (0, drizzle_orm_pg_core.text)().notNull(),
	...timestampsDeleted
}, (t) => [(0, drizzle_orm_pg_core.primaryKey)({ columns: [
	t.pgmid,
	t.object,
	t.object_name
] })]);
/**
* Boilerplate Counter for Testing
*/
var counterSchema = (0, drizzle_orm_pg_core.pgTable)("counter", {
	id: (0, drizzle_orm_pg_core.serial)("id").primaryKey(),
	count: (0, drizzle_orm_pg_core.integer)("count").default(0),
	updatedAt: (0, drizzle_orm_pg_core.timestamp)("updated_at", { mode: "date" }).defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
	createdAt: (0, drizzle_orm_pg_core.timestamp)("created_at", { mode: "date" }).defaultNow().notNull()
});
//#endregion
//#region src/services/utils.ts
var getScopeFromName = (name) => {
	return name.startsWith("@") ? name.split("/")[0] : "";
};
var getPackageFromName = (name) => {
	return name.startsWith("@") ? name.split("/")[1] : name;
};
var getNameFromPackageAndScope = (packageName, scope) => {
	return scope.length > 0 ? `${scope}/${packageName}` : packageName;
};
var getVersionFromFilename = (filename) => {
	const match = filename.match(/^.*-(\d+\.\d+\.\d+.*)\.tgz$/);
	if (!match) throw new Error(`Invalid tarball filename: ${filename}`);
	return match[1];
};
var getPackageInfoFromPath = (path) => {
	let match;
	if (path.startsWith("/@")) match = path.match(/^(\/@[^/]+\/[^/]+)\/-\/[^/]+-(\d+\.\d+\.\d+.*)\.tgz$/);
	else match = path.match(/^(\/?[^/]+)\/-\/[^/]+-(\d+\.\d+\.\d+.*)\.tgz$/);
	if (!match) throw new Error(`Invalid tarball path: ${path}`);
	return {
		name: match[1],
		version: match[2]
	};
};
var getISODate = (date) => {
	return new Date(date).toISOString().split("T")[0];
};
var getISODates = (start, end) => {
	const dates = [];
	dates.push(getISODate(start));
	dates.push(getISODate(end || start));
	return dates;
};
var unescapeHtmlEntities = (json) => {
	return json.replace(/\\u003e/g, ">").replace(/\\u003c/g, "<").replace(/\\u0026/g, "&");
};
//#endregion
//#region src/services/downloads.ts
var debug$9 = (0, debug.default)("verdaccio:plugin:pro:db");
var DownloadsService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
	}
	async increment(path) {
		const { name, version } = getPackageInfoFromPath(path);
		const now = /* @__PURE__ */ new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1;
		const today = now.toISOString().split("T")[0];
		const data = [
			{
				timeslice: "d",
				year,
				month,
				date: today,
				name,
				version,
				count: 1
			},
			{
				timeslice: "d",
				year,
				month,
				date: today,
				name: null,
				version: null,
				count: 1
			},
			{
				timeslice: "m",
				year,
				month,
				date: null,
				name: null,
				version: null,
				count: 1
			},
			{
				timeslice: "y",
				year,
				month: null,
				date: null,
				name: null,
				version: null,
				count: 1
			},
			{
				timeslice: "t",
				year: null,
				month: null,
				date: null,
				name: null,
				version: null,
				count: 1
			}
		];
		try {
			await this.db.insert(downloads).values(data).onConflictDoUpdate({
				target: [
					downloads.timeslice,
					downloads.year,
					downloads.month,
					downloads.date,
					downloads.name,
					downloads.version
				],
				set: { count: drizzle_orm.sql`${downloads.count} + 1` }
			});
			debug$9("downloads incremented successfully");
		} catch (error) {
			debug$9("downloads error: %o", error);
		}
	}
	async getDownloads(timeslice, start, end) {
		const [startDate, endDate] = getISODates(start, end);
		return (await this.db.select({
			date: downloads.date,
			count: (0, drizzle_orm.sum)(downloads.count)
		}).from(downloads).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(downloads.timeslice, timeslice), (0, drizzle_orm.between)(downloads.date, startDate, endDate), (0, drizzle_orm.isNull)(downloads.name))).groupBy(downloads.date).orderBy(downloads.date)).map((d) => ({
			date: d.date,
			count: Number(d.count)
		}));
	}
	async getByPackage(packageName, start, end) {
		const [startDate, endDate] = getISODates(start, end);
		return (await this.db.select({
			date: downloads.date,
			count: (0, drizzle_orm.sum)(downloads.count)
		}).from(downloads).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(downloads.timeslice, "d"), (0, drizzle_orm.between)(downloads.date, startDate, endDate), (0, drizzle_orm.eq)(downloads.name, packageName))).groupBy(downloads.date).orderBy(downloads.date)).map((d) => ({
			date: d.date,
			count: Number(d.count)
		}));
	}
	async getByVersion(packageName, start, end) {
		const [startDate, endDate] = getISODates(start, end);
		return (await this.db.select({
			version: downloads.version,
			count: (0, drizzle_orm.sum)(downloads.count)
		}).from(downloads).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(downloads.timeslice, "d"), (0, drizzle_orm.between)(downloads.date, startDate, endDate), (0, drizzle_orm.eq)(downloads.name, packageName))).groupBy(downloads.version).orderBy(downloads.version)).map((d) => ({
			version: d.version,
			count: Number(d.count)
		}));
	}
};
//#endregion
//#region src/services/org.ts
var PUBLIC_PACKAGES = "@";
var OrgService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
		this.orgCache = /* @__PURE__ */ new Map();
	}
	async getOrgId(name) {
		const [ids] = await this.db.select({ id: orgs.id }).from(orgs).where((0, drizzle_orm.eq)(orgs.org, name));
		if (!ids) throw _verdaccio_core.errorUtils.getNotFound(`organization "${name}" not found`);
		return ids.id;
	}
	async getOrgIdfromPackage(name) {
		if (this.orgCache.has(name)) return this.orgCache.get(name);
		let orgId;
		if (name.startsWith("@")) orgId = await this.getOrgId(name.split("/")[0]);
		else orgId = await this.getOrgId("@");
		this.orgCache.set(name, orgId);
		return orgId;
	}
};
//#endregion
//#region src/services/tenant.ts
var TenantService = class {
	constructor(database, logger) {
		this.org = new OrgService(database, logger);
	}
	async get(name) {
		return await this.org.getOrgIdfromPackage(name);
	}
};
//#endregion
//#region src/services/event-log.ts
var debug$8 = (0, debug.default)("verdaccio:plugin:pro:db");
var ANONYMOUS_USER = "#";
var EventLogService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
		this.tenant = new TenantService(database, logger);
		this.eventCache = /* @__PURE__ */ new Map();
		this.userCache = /* @__PURE__ */ new Map();
	}
	async log(user, method, event, name, version) {
		const data = {
			org_id: await this.tenant.get(name),
			user_id: await this.getUserId(user),
			method,
			event_id: await this.getEventId(event),
			name,
			version
		};
		try {
			await this.db.insert(eventLog).values(data);
			debug$8("activity logged successfully");
		} catch (error) {
			debug$8("activity error: %o", error);
		}
	}
	async getUserId(user) {
		if (!user || user === "") return this.getUserId("#");
		if (this.userCache.has(user)) return this.userCache.get(user);
		const [ids] = await this.db.select({ id: users.id }).from(users).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(users.user, user), (0, drizzle_orm.isNull)(users.deleted)));
		if (!ids) throw _verdaccio_core.errorUtils.getNotFound(`user "${user}" not found`);
		const id = ids.id;
		this.userCache.set(user, id);
		return id;
	}
	async getEventId(event) {
		if (this.eventCache.has(event)) return this.eventCache.get(event);
		const [ids] = await this.db.select({ id: events.id }).from(events).where((0, drizzle_orm.eq)(events.event, event));
		if (!ids) throw _verdaccio_core.errorUtils.getNotFound(`event "${event}" not found`);
		const id = ids.id;
		this.eventCache.set(event, id);
		return id;
	}
};
//#endregion
//#region src/services/gtadir.ts
var debug$7 = (0, debug.default)("verdaccio:plugin:pro:db");
var GlobalTadirService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
		this.tenant = new TenantService(database, logger);
	}
	async exists(tadir) {
		debug$7("check if GTADIR entries exist");
		if (tadir.length === 0) return false;
		const conditions = tadir.map((record) => {
			const [object, object_name] = record.split(",");
			return (0, drizzle_orm.and)((0, drizzle_orm.eq)(gtadir.pgmid, "R3TR"), (0, drizzle_orm.eq)(gtadir.object, object), (0, drizzle_orm.eq)(gtadir.object_name, object_name), (0, drizzle_orm.isNull)(gtadir.deleted));
		});
		const existing = await this.db.select({ id: gtadir.id }).from(gtadir).where((0, drizzle_orm.or)(...conditions)).limit(1);
		debug$7("Existing GTADIR entries: %o", existing.length);
		return existing.length > 0;
	}
	async check(tadir) {
		debug$7("check GTADIR entries and return names and versions");
		if (tadir.length === 0) return [];
		const conditions = tadir.map((record) => {
			const [object, object_name] = record.split(",");
			return (0, drizzle_orm.and)((0, drizzle_orm.eq)(gtadir.pgmid, "R3TR"), (0, drizzle_orm.eq)(gtadir.object, object), (0, drizzle_orm.eq)(gtadir.object_name, object_name), (0, drizzle_orm.isNull)(gtadir.deleted));
		});
		const results = await this.db.selectDistinct({
			name: gtadir.name,
			version: gtadir.version
		}).from(gtadir).where((0, drizzle_orm.or)(...conditions));
		debug$7("Found GTADIR entries: %o", results.length);
		return results;
	}
	async add(name, version, tadir) {
		debug$7("add GTADIR %o %o, records %o", name, version, tadir.length);
		if (await this.exists(tadir)) throw _verdaccio_core.errorUtils.getInternalError(`Objects already exist in GTADIR database`);
		const org_id = await this.tenant.get(name);
		const tadirData = tadir.map((record) => {
			const [object, object_name] = record.split(",");
			return {
				pgmid: "R3TR",
				object,
				object_name,
				org_id,
				name,
				version,
				created: /* @__PURE__ */ new Date(),
				updated: /* @__PURE__ */ new Date(),
				deleted: null
			};
		});
		try {
			await this.db.insert(gtadir).values(tadirData);
			debug$7("GTADIR %o has been added", name);
		} catch (error) {
			debug$7("upsert error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error adding GTADIR: ${error}`);
		}
	}
	async remove(name, version) {
		debug$7("remove GTADIR %o, version %o", name, version);
		const org_id = await this.tenant.get(name);
		try {
			await this.db.delete(gtadir).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(gtadir.org_id, org_id), (0, drizzle_orm.eq)(gtadir.name, name), (0, drizzle_orm.eq)(gtadir.version, version)));
			debug$7("GTADIR %o, version %o has been removed", name, version);
		} catch (error) {
			debug$7("delete error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error deleting GTADIR: ${error}`);
		}
	}
	async get(name, version) {
		debug$7("get object list of package");
		const org_id = await this.tenant.get(name);
		const objects = await this.db.select({
			pgmid: gtadir.pgmid,
			object: gtadir.object,
			object_name: gtadir.object_name
		}).from(gtadir).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(gtadir.org_id, org_id), (0, drizzle_orm.eq)(gtadir.name, name), version ? (0, drizzle_orm.eq)(gtadir.version, version) : void 0, (0, drizzle_orm.isNull)(gtadir.deleted))).orderBy(gtadir.name);
		debug$7("list of %o objects has been fetched", objects ? objects.length : 0);
		return objects.map((row) => `${row.pgmid},${row.object},${row.object_name}`);
	}
	async clean() {
		debug$7("clean all GTADIR");
		await this.db.execute(drizzle_orm.sql`TRUNCATE TABLE gtadir`);
	}
};
//#endregion
//#region src/services/local-package.ts
var debug$6 = (0, debug.default)("verdaccio:plugin:pro:db");
var LocalPackagesService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
		this.tenant = new TenantService(database, logger);
	}
	async add(name) {
		debug$6("add local package %o", name);
		const org_id = await this.tenant.get(name);
		try {
			await this.db.insert(localPackages).values({
				org_id,
				name
			}).onConflictDoUpdate({
				target: [localPackages.org_id, localPackages.name],
				set: { updated: /* @__PURE__ */ new Date() }
			});
			debug$6("package %o has been added", name);
		} catch (error) {
			debug$6("upsert error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error adding local package: ${error}`);
		}
	}
	async remove(name) {
		debug$6("remove local package %o", name);
		const org_id = await this.tenant.get(name);
		try {
			await this.db.delete(localPackages).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(localPackages.org_id, org_id), (0, drizzle_orm.eq)(localPackages.name, name)));
			debug$6("package %o has been removed", name);
		} catch (error) {
			debug$6("delete error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error deleting local package: ${error}`);
		}
	}
	async get() {
		debug$6("get full list of package");
		const names = await this.db.select({ name: localPackages.name }).from(localPackages).orderBy(localPackages.name);
		debug$6("list of %o packages has been fetched", names ? names.length : 0);
		return names.map((row) => row.name);
	}
	async clean() {
		debug$6("clean all local packages");
		await this.db.execute(drizzle_orm.sql`TRUNCATE TABLE local_packages`);
	}
};
//#endregion
//#region src/services/manifest.ts
var getReadmesFromManifest = (manifest) => {
	const readmes = [];
	for (const version in manifest.versions) {
		const readme = manifest.versions[version].readme;
		if (readme) readmes.push({
			version,
			markdown: readme
		});
	}
	const latest = manifest.readme;
	if (latest) readmes.push({
		version: "latest",
		markdown: latest
	});
	return readmes;
};
var clearReadmesFromManifest = (manifest) => {
	const manifestCopy = JSON.parse(JSON.stringify(manifest));
	for (const version in manifestCopy.versions) manifestCopy.versions[version].readdown = "";
	manifestCopy.readme = "";
	return manifestCopy;
};
var mergeReadmesIntoManifest = (manifest, readmes) => {
	const manifestCopy = JSON.parse(JSON.stringify(manifest));
	for (const readme of readmes) if (readme.version === "latest") manifestCopy.readme = readme.markdown;
	else if (manifestCopy.versions[readme.version]) manifestCopy.versions[readme.version].readme = readme.markdown;
	return manifestCopy;
};
var getMetadataFromManifest = (manifest) => {
	const metadata = [];
	for (const version in manifest.versions) {
		const packageVersion = manifest.versions[version];
		const description = packageVersion.description || "";
		const keywords = Array.isArray(packageVersion.keywords) ? packageVersion.keywords.join(" ") : packageVersion.keywords || "";
		metadata.push({
			version,
			description,
			keywords
		});
	}
	return metadata;
};
//#endregion
//#region src/services/package.ts
var debug$5 = (0, debug.default)("verdaccio:plugin:pro:db");
var PackageService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
		this.tenant = new TenantService(database, logger);
	}
	async exists(name) {
		const org_id = await this.tenant.get(name);
		const exists = await this.db.$count(packages, (0, drizzle_orm.and)((0, drizzle_orm.eq)(packages.org_id, org_id), (0, drizzle_orm.eq)(packages.name, name), (0, drizzle_orm.isNull)(packages.deleted))) > 0;
		debug$5("package exists: %o", exists);
		return exists;
	}
	async create(name, manifest) {
		await this.save(name, manifest);
		debug$5("package created successfully");
	}
	async read(name, noThrow) {
		const org_id = await this.tenant.get(name);
		const [packageJson] = await this.db.select({ json: packages.json }).from(packages).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(packages.org_id, org_id), (0, drizzle_orm.eq)(packages.name, name), (0, drizzle_orm.isNull)(packages.deleted)));
		if (!packageJson) {
			if (noThrow) return {};
			throw _verdaccio_core.errorUtils.getNotFound("package.json not found");
		}
		const manifestMerged = mergeReadmesIntoManifest(JSON.parse(unescapeHtmlEntities(JSON.stringify(packageJson.json))), await this.db.select({
			version: readmes.version,
			markdown: readmes.markdown
		}).from(readmes).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(readmes.org_id, org_id), (0, drizzle_orm.eq)(readmes.name, name), (0, drizzle_orm.isNull)(readmes.deleted))));
		debug$5("package read successfully");
		return manifestMerged;
	}
	async save(name, manifest) {
		const org_id = await this.tenant.get(name);
		await this.db.transaction(async (tx) => {
			const tags = manifest["dist-tags"];
			const distTagsData = Object.entries(tags).map(([tag, version]) => ({
				org_id,
				tag,
				name,
				version
			}));
			try {
				await tx.delete(distTags).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(distTags.org_id, org_id), (0, drizzle_orm.eq)(distTags.name, name)));
				debug$5("dist-tags deleted successfully");
			} catch (error) {
				debug$5("dist-tags delete error: %o", error);
			}
			if (distTagsData && distTagsData.length > 0) try {
				await tx.insert(distTags).values(distTagsData);
				debug$5("dist-tags saved successfully");
			} catch (error) {
				debug$5("dist-tags insert error: %o", error);
				tx.rollback();
			}
			const readmesData = getReadmesFromManifest(manifest).map((row) => ({
				org_id,
				name,
				version: row.version,
				markdown: row.markdown,
				deleted: null
			}));
			if (readmesData && readmesData.length > 0) try {
				await tx.insert(readmes).values(readmesData).onConflictDoUpdate({
					target: [
						readmes.org_id,
						readmes.name,
						readmes.version
					],
					set: {
						markdown: drizzle_orm.sql`excluded.markdown`,
						updated: /* @__PURE__ */ new Date(),
						deleted: null
					}
				});
				debug$5("readmes saved successfully");
			} catch (error) {
				debug$5("readmes error: %o", error);
				tx.rollback();
			}
			const metadataData = getMetadataFromManifest(manifest).map((row) => ({
				org_id,
				name,
				version: row.version,
				description: row.description,
				keywords: row.keywords,
				deleted: null
			}));
			if (metadataData && metadataData.length > 0) try {
				await tx.insert(metadata).values(metadataData).onConflictDoUpdate({
					target: [
						metadata.org_id,
						metadata.name,
						metadata.version
					],
					set: {
						description: drizzle_orm.sql`excluded.description`,
						keywords: drizzle_orm.sql`excluded.keywords`,
						updated: /* @__PURE__ */ new Date()
					}
				});
				debug$5("package metadata saved successfully");
			} catch (error) {
				debug$5("package metadata error: %o", error);
				tx.rollback();
			}
			const manifestClean = clearReadmesFromManifest(manifest);
			try {
				await tx.insert(packages).values({
					org_id,
					name,
					json: manifestClean
				}).onConflictDoUpdate({
					target: [packages.org_id, packages.name],
					set: {
						json: drizzle_orm.sql`excluded.json`,
						updated: /* @__PURE__ */ new Date(),
						deleted: null
					}
				});
				debug$5("package saved successfully");
			} catch (error) {
				debug$5("packages error: %o", error);
				tx.rollback();
			}
		});
	}
	async update(name, handleUpdate) {
		const manifestUpdated = await handleUpdate(await this.read(name, true));
		debug$5("package updated successfully");
		return manifestUpdated;
	}
	async delete(name) {
		const org_id = await this.tenant.get(name);
		await this.db.transaction(async (tx) => {
			try {
				await tx.update(packages).set({ deleted: /* @__PURE__ */ new Date() }).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(packages.org_id, org_id), (0, drizzle_orm.eq)(packages.name, name)));
				debug$5("package deleted successfully");
			} catch (error) {
				debug$5("packages error: %o", error);
				tx.rollback();
			}
			try {
				await tx.update(readmes).set({ deleted: /* @__PURE__ */ new Date() }).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(readmes.org_id, org_id), (0, drizzle_orm.eq)(readmes.name, name)));
				debug$5("readmes deleted successfully");
			} catch (error) {
				debug$5("readmes error: %o", error);
				tx.rollback();
			}
			try {
				await tx.delete(distTags).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(distTags.org_id, org_id), (0, drizzle_orm.eq)(distTags.name, name)));
				debug$5("dist-tags deleted successfully");
			} catch (error) {
				debug$5("dist-tags error: %o", error);
			}
			try {
				await tx.delete(metadata).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(metadata.org_id, org_id), (0, drizzle_orm.eq)(metadata.name, name)));
				debug$5("package metadata deleted successfully");
			} catch (error) {
				debug$5("package metadata error: %o", error);
			}
		});
	}
	static async search(db, query) {
		const results = [];
		const matchQuery = drizzle_orm.sql`websearch_to_tsquery('english', ${query.text})`;
		const rows = await db.select({
			name: metadata.name,
			version: metadata.version,
			updated: metadata.updated,
			rank: drizzle_orm.sql`ts_rank(search_english, ${matchQuery})`
		}).from(metadata).where(drizzle_orm.sql`search_english @@ ${matchQuery}`).orderBy((t) => (0, drizzle_orm.desc)(t.rank)).limit(100);
		for (const row of rows) results.push({
			name: row.name,
			scoped: row.name,
			path: void 0,
			time: row.rank
		});
		debug$5("%o packages found", results.length);
		if (!results || results.length === 0) {
			debug$5("no results found");
			return results;
		}
		debug$5("%o results found", results.length);
		return results.slice(query.from, query.size);
	}
	async getDistTags(names) {
		const result = {};
		const rows = await this.db.select({
			org_id: distTags.org_id,
			name: distTags.name,
			tag: distTags.tag,
			version: distTags.version
		}).from(distTags).where((0, drizzle_orm.inArray)(distTags.name, names)).orderBy(distTags.name, distTags.tag);
		for (const row of rows) {
			const org_id = await this.tenant.get(row.name);
			if (row.org_id === org_id) result[row.name][row.tag] = row.version;
		}
		return result;
	}
};
//#endregion
//#region src/services/tarball.ts
var debug$4 = (0, debug.default)("verdaccio:plugin:pro:db");
var CHUNK_SIZE = 256 * 1024;
var TarballService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
		this.tenant = new TenantService(database, logger);
	}
	async exists(packageName, fileName) {
		const org_id = await this.tenant.get(packageName);
		const exists = await this.db.$count(tarballs, (0, drizzle_orm.and)((0, drizzle_orm.eq)(tarballs.org_id, org_id), (0, drizzle_orm.eq)(tarballs.name, packageName), (0, drizzle_orm.eq)(tarballs.filename, fileName), (0, drizzle_orm.isNull)(tarballs.deleted))) > 0;
		debug$4("tarball exists: %o", exists);
		return exists;
	}
	async read(packageName, fileName, { signal }) {
		const org_id = await this.tenant.get(packageName);
		const version = getVersionFromFilename(fileName);
		const [tarballData] = await this.db.select({
			data: tarballs.data,
			size: tarballs.size
		}).from(tarballs).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(tarballs.org_id, org_id), (0, drizzle_orm.eq)(tarballs.name, packageName), (0, drizzle_orm.eq)(tarballs.version, version), (0, drizzle_orm.isNull)(tarballs.deleted)));
		if (!tarballData) throw _verdaccio_core.errorUtils.getNotFound(`Tarball not found: ${fileName}`);
		const readable = new stream.Readable({ read() {
			for (let i = 0; i < tarballData.data.length; i += CHUNK_SIZE) {
				const dataChunk = tarballData.data.subarray(i, i + CHUNK_SIZE);
				this.push(dataChunk);
				if (dataChunk.length !== CHUNK_SIZE) break;
			}
			this.push(null);
		} });
		signal.addEventListener("abort", () => {
			debug$4("aborting read stream");
			tarballData.data = Buffer.alloc(0);
			readable.destroy();
		});
		readable.on("open", () => {
			debug$4("opening read stream");
			readable.emit("content-size", tarballData.size);
		});
		process.nextTick(() => {
			readable.emit("open");
		});
		debug$4("returning readable stream");
		return readable;
	}
	async write(packageName, fileName, { signal }) {
		const org_id = await this.tenant.get(packageName);
		const version = getVersionFromFilename(fileName);
		const chunks = [];
		const writable = new stream.Writable({ write(chunk, encoding, callback) {
			chunks.push(Buffer.from(chunk));
			callback();
		} });
		signal.addEventListener("abort", () => {
			debug$4("aborting write stream");
			writable.destroy();
		});
		process.nextTick(() => {
			debug$4("opening write stream");
			writable.emit("open");
		});
		writable.on("finish", async () => {
			const data = Buffer.concat(chunks);
			const tarballData = {
				org_id,
				name: packageName,
				version,
				filename: fileName,
				data,
				size: data.length
			};
			try {
				await this.db.insert(tarballs).values(tarballData).onConflictDoUpdate({
					target: [
						tarballs.org_id,
						tarballs.name,
						tarballs.version
					],
					set: {
						data: drizzle_orm.sql`excluded.data`,
						size: drizzle_orm.sql`excluded.size`,
						updated: /* @__PURE__ */ new Date(),
						deleted: null
					}
				});
				debug$4("tarball written successfully");
			} catch (err) {
				debug$4("write error: %o", err);
				tarballData.data = Buffer.alloc(0);
				writable.destroy(err);
			}
		});
		writable.on("error", (err) => {
			debug$4("write stream error: %o", err);
			writable.destroy(err);
		});
		debug$4("returning writable stream");
		return writable;
	}
	async delete(packageName, fileName) {
		const org_id = await this.tenant.get(packageName);
		const version = getVersionFromFilename(fileName);
		try {
			await this.db.update(tarballs).set({ deleted: /* @__PURE__ */ new Date() }).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(tarballs.org_id, org_id), (0, drizzle_orm.eq)(tarballs.name, packageName), (0, drizzle_orm.eq)(tarballs.version, version)));
			debug$4("tarball deleted");
		} catch (error) {
			debug$4("error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error deleting tarball: ${error}`);
		}
	}
	async remove(packageName) {
		const org_id = await this.tenant.get(packageName);
		try {
			await this.db.update(tarballs).set({ deleted: /* @__PURE__ */ new Date() }).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(tarballs.org_id, org_id), (0, drizzle_orm.eq)(tarballs.name, packageName)));
			debug$4("all tarballs removed");
		} catch (error) {
			debug$4("error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error removing all tarballs: ${error}`);
		}
	}
};
//#endregion
//#region src/services/token.ts
var debug$3 = (0, debug.default)("verdaccio:plugin:pro:db");
var TokenService = class TokenService {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
	}
	async read({ user }) {
		const userTokens = await this.db.select({
			user: tokens.user,
			key: tokens.key,
			token: tokens.token,
			cidr: tokens.cidr,
			readonly: tokens.readonly,
			created: tokens.created,
			updated: tokens.updated
		}).from(tokens).where((0, drizzle_orm.eq)(tokens.user, user)).orderBy(tokens.user, tokens.key);
		if (!userTokens || userTokens.length === 0) {
			debug$3("token not found");
			return [];
		}
		const verdaccioTokens = userTokens.map((token) => TokenService.toVerdaccioToken(token));
		debug$3("token read successfully");
		return verdaccioTokens;
	}
	async save(token) {
		try {
			await this.db.insert(tokens).values(TokenService.fromVerdaccioToken(token));
			debug$3("token saved successfully");
		} catch (error) {
			debug$3("tokens error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error saving token: ${error}`);
		}
	}
	async delete(user, key) {
		const exists = await this.db.select().from(tokens).where((0, drizzle_orm.eq)(tokens.user, user));
		if (!exists || exists.length === 0) throw new Error("user not found");
		try {
			await this.db.delete(tokens).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(tokens.user, user), (0, drizzle_orm.eq)(tokens.key, key)));
			debug$3("token deleted successfully");
		} catch (error) {
			debug$3("tokens error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error deleting token: ${error}`);
		}
	}
	static toVerdaccioToken(token) {
		return {
			...token,
			cidr: token.cidr || void 0,
			created: token.created && token.created.getTime(),
			updated: token.updated && token.updated.getTime()
		};
	}
	static fromVerdaccioToken(token) {
		return {
			...token,
			created: new Date(token.created),
			updated: token.updated && new Date(token.updated) || void 0
		};
	}
};
//#endregion
//#region src/services/cipher.ts
var password = ENV.DATABASE_SECRET;
var algorithm = "aes-192-cbc";
var keyLength = 24;
var salt = ENV.DB_SALT;
var scryptAsync = (0, node_util.promisify)(node_crypto.scrypt);
async function getKey() {
	return scryptAsync(password, salt, keyLength);
}
async function encrypt(text) {
	const key = await getKey();
	const iv = Buffer.alloc(16);
	await (0, node_util.promisify)(node_crypto.randomFill)(iv);
	const cipher = (0, node_crypto.createCipheriv)(algorithm, key, iv);
	const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
	return `${iv.toString("hex")}:${encrypted}`;
}
async function decrypt(encryptedText) {
	const [ivHex, encrypted] = encryptedText.split(":");
	const decipher = (0, node_crypto.createDecipheriv)(algorithm, await getKey(), Buffer.from(ivHex, "hex"));
	return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
}
//#endregion
//#region src/services/user-secrets.ts
var debug$2 = (0, debug.default)("verdaccio:plugin:pro:db");
var USER_HASH_SEPARATOR = "|";
var UserSecretsService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
	}
	async count() {
		return await this.db.$count(userSecrets, (0, drizzle_orm.isNull)(userSecrets.deleted));
	}
	async add(user, hash, email) {
		try {
			const userSecret = {
				user,
				hash: await encrypt(user + USER_HASH_SEPARATOR + hash),
				email: await encrypt(email)
			};
			await this.db.insert(userSecrets).values(userSecret);
			debug$2("user added successfully");
		} catch (error) {
			debug$2("user add error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error adding user: ${error}`);
		}
	}
	async remove(user) {
		try {
			await this.db.update(userSecrets).set({ deleted: /* @__PURE__ */ new Date() }).where((0, drizzle_orm.eq)(userSecrets.user, user));
			debug$2("user removed successfully");
		} catch (error) {
			debug$2("user remove error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error removing user: ${error}`);
		}
	}
	async getHash(user) {
		const [userSecret] = await this.db.select({ hash: userSecrets.hash }).from(userSecrets).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(userSecrets.user, user), (0, drizzle_orm.isNull)(userSecrets.deleted)));
		if (!userSecret) {
			debug$2("user %s not found", user);
			return null;
		}
		return (await decrypt(userSecret.hash)).split(USER_HASH_SEPARATOR)[1] ?? null;
	}
	async getEmail(user) {
		const [userSecret] = await this.db.select({ email: userSecrets.email }).from(userSecrets).where((0, drizzle_orm.and)((0, drizzle_orm.eq)(userSecrets.user, user), (0, drizzle_orm.isNull)(userSecrets.deleted)));
		if (!userSecret) {
			debug$2("user %s not found", user);
			return null;
		}
		return await decrypt(userSecret.email);
	}
	async changePassword(user, hash) {
		try {
			const encryptedHash = await encrypt(user + hash);
			await this.db.update(userSecrets).set({
				hash: encryptedHash,
				updated: /* @__PURE__ */ new Date(),
				deleted: null
			}).where((0, drizzle_orm.eq)(userSecrets.user, user));
			debug$2("password changed successfully");
		} catch (error) {
			debug$2("password change error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error changing password: ${error}`);
		}
	}
	async changeEmail(user, email) {
		try {
			const encryptedEmail = await encrypt(email);
			await this.db.update(userSecrets).set({
				email: encryptedEmail,
				updated: /* @__PURE__ */ new Date(),
				deleted: null
			}).where((0, drizzle_orm.eq)(userSecrets.user, user));
			debug$2("email changed successfully");
		} catch (error) {
			debug$2("email change error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error changing email: ${error}`);
		}
	}
};
//#endregion
//#region src/services/verdaccio-secret.ts
var debug$1 = (0, debug.default)("verdaccio:plugin:pro:db");
var SECRET_NAME = "verdaccio";
var VerdaccioSecretService = class {
	constructor(database, logger) {
		this.db = database;
		this.logger = logger;
	}
	async set(secret) {
		try {
			await this.db.insert(secrets).values({
				name: SECRET_NAME,
				value: secret
			}).onConflictDoUpdate({
				target: [secrets.name],
				set: {
					value: drizzle_orm.sql`excluded.value`,
					updated: /* @__PURE__ */ new Date()
				}
			});
			debug$1("secret set successfully");
		} catch (error) {
			debug$1("secrets error: %o", error);
			throw _verdaccio_core.errorUtils.getInternalError(`Error setting secret: ${error}`);
		}
		return secret;
	}
	async get() {
		const [secret] = await this.db.select({ value: secrets.value }).from(secrets).where((0, drizzle_orm.eq)(secrets.name, SECRET_NAME));
		return secret ? secret.value : "";
	}
};
//#endregion
exports.ANONYMOUS_USER = ANONYMOUS_USER;
exports.DownloadsService = DownloadsService;
exports.ENV = ENV;
exports.EventLogService = EventLogService;
exports.GlobalTadirService = GlobalTadirService;
exports.LocalPackagesService = LocalPackagesService;
exports.OrgService = OrgService;
exports.PUBLIC_PACKAGES = PUBLIC_PACKAGES;
exports.PackageService = PackageService;
exports.TarballService = TarballService;
exports.TenantService = TenantService;
exports.TokenService = TokenService;
exports.UserSecretsService = UserSecretsService;
exports.VerdaccioSecretService = VerdaccioSecretService;
exports.clearReadmesFromManifest = clearReadmesFromManifest;
exports.clerkEvents = clerkEvents;
exports.clerkMembers = clerkMembers;
exports.clerkOrgs = clerkOrgs;
exports.clerkUsers = clerkUsers;
exports.counterSchema = counterSchema;
exports.distTags = distTags;
exports.downloads = downloads;
exports.eventLog = eventLog;
exports.events = events;
exports.getDatabase = getDatabase;
exports.getISODate = getISODate;
exports.getISODates = getISODates;
exports.getMetadataFromManifest = getMetadataFromManifest;
exports.getNameFromPackageAndScope = getNameFromPackageAndScope;
exports.getPackageFromName = getPackageFromName;
exports.getPackageInfoFromFilename = getPackageInfoFromPath;
exports.getReadmesFromManifest = getReadmesFromManifest;
exports.getScopeFromName = getScopeFromName;
exports.gtadir = gtadir;
exports.localPackages = localPackages;
exports.loggerFactory = loggerFactory;
exports.mergeReadmesIntoManifest = mergeReadmesIntoManifest;
exports.metadata = metadata;
exports.methodEnum = methodEnum;
exports.orgMembers = orgMembers;
exports.orgs = orgs;
exports.packages = packages;
exports.paddleEvents = paddleEvents;
exports.paddleSubscriptions = paddleSubscriptions;
exports.permissionEnum = permissionEnum;
exports.readmes = readmes;
exports.roles = roles;
exports.secrets = secrets;
exports.subscriptionStatusEnum = subscriptionStatusEnum;
exports.tarballs = tarballs;
exports.teamMembers = teamMembers;
exports.teamPackages = teamPackages;
exports.teams = teams;
exports.timesliceEnum = timesliceEnum;
exports.tokens = tokens;
exports.tsVector = tsVector;
exports.unescapeHtmlEntities = unescapeHtmlEntities;
exports.userSecrets = userSecrets;
exports.users = users;
