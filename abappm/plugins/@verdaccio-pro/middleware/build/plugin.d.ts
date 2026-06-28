import { Express } from 'express';
import { pluginUtils } from '@verdaccio/core';
import { Config, Logger } from '@verdaccio/types';
export interface MiddlewareConfig {
    enabled: boolean;
    /** When omitted, true. Set to false to skip this middleware. */
    prototypePollutionProtection?: boolean;
    profanityFilter?: boolean;
    blacklistFilter?: boolean;
    eventLog?: boolean;
    securityHeaders?: boolean;
    /** Origins allowed credentialed CORS; all other cross-origin requests receive public wildcard CORS. */
    corsAllowedOrigins?: string[];
    blockUnwantedRequests?: boolean;
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
