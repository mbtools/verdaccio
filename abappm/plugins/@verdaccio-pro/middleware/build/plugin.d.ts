import { Express } from 'express';
import { pluginUtils } from '@verdaccio/core';
import { Config, Logger } from '@verdaccio/types';
/** When an option is omitted, true. Set to false to skip a particular middleware. */
export interface MiddlewareConfig {
    enabled: boolean;
    /** Rejects JSON bodies containing __proto__, constructor, or prototype keys. */
    prototypePollutionProtection?: boolean;
    /** Rejects write requests whose JSON body contains profanity. */
    profanityFilter?: boolean;
    /** Rejects write requests whose JSON body links to blocked adult domains. */
    blacklistFilter?: boolean;
    /** Records package and user activity events to storage. */
    eventLog?: boolean;
    /** Writes each HTTP request to a timestamped file under http-logs/. */
    httpLog?: boolean;
    /** Sets security headers and configurable CORS on all responses. */
    securityHeaders?: boolean;
    /** Origins allowed credentialed CORS; all other cross-origin requests receive public wildcard CORS. */
    corsAllowedOrigins?: string[];
    /** Returns 404 for requests probing common non-registry file extensions. */
    blockUnwantedRequests?: boolean;
    /** Redirects /package/* URLs to the web UI detail page. */
    redirectNpmStyleUrl?: boolean;
    /** RegExp source; requests whose User-Agent header does not match are rejected. */
    userAgent?: string;
}
declare class MiddlewarePlugin extends pluginUtils.Plugin<MiddlewareConfig> implements pluginUtils.ExpressMiddleware<MiddlewareConfig, pluginUtils.Storage<MiddlewareConfig>, pluginUtils.Auth<MiddlewareConfig>> {
    config: Config;
    logger: Logger;
    private middlewareConfig;
    constructor(config: MiddlewareConfig, options: pluginUtils.PluginOptions);
    register_middlewares(app: Express, _auth: pluginUtils.Auth<MiddlewareConfig>, storage: pluginUtils.Storage<MiddlewareConfig>): void;
}
export default MiddlewarePlugin;
