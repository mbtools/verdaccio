import { Express } from 'express';
import { pluginUtils } from '@verdaccio/core';
import { Config, Logger } from '@verdaccio/types';
export interface MiddlewareConfig {
    enabled: boolean;
    /** When omitted, true. Set to false to skip this middleware. */
    prototypePollutionProtection?: boolean;
    profanityFilter?: boolean;
    blacklistFilter?: boolean;
    securityHeaders?: boolean;
    blockUnwantedRequests?: boolean;
    redirectNpmStyleUrl?: boolean;
}
declare class MiddlewarePlugin extends pluginUtils.Plugin<MiddlewareConfig> implements pluginUtils.ExpressMiddleware<MiddlewareConfig, pluginUtils.Storage<MiddlewareConfig>, pluginUtils.Auth<MiddlewareConfig>> {
    config: Config;
    logger: Logger;
    private middlewareConfig;
    constructor(config: MiddlewareConfig, options: pluginUtils.PluginOptions);
    register_middlewares(app: Express, _auth: pluginUtils.Auth<MiddlewareConfig>, _storage: pluginUtils.Storage<MiddlewareConfig>): void;
}
export default MiddlewarePlugin;
