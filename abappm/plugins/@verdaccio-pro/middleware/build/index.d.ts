import { Express } from 'express';
import { pluginUtils } from '@verdaccio/core';
import { Config, Logger } from '@verdaccio/types';

interface MiddlewareConfig extends Config {
    enabled: boolean;
}
declare class MiddlewarePlugin extends pluginUtils.Plugin<MiddlewareConfig> implements pluginUtils.ExpressMiddleware<MiddlewareConfig, pluginUtils.Storage<MiddlewareConfig>, pluginUtils.Auth<MiddlewareConfig>> {
    config: Config;
    logger: Logger;
    private pluginConfig;
    constructor(config: MiddlewareConfig, options: pluginUtils.PluginOptions);
    register_middlewares(app: Express, _auth: pluginUtils.Auth<MiddlewareConfig>, _storage: pluginUtils.Storage<MiddlewareConfig>): void;
}

export { type MiddlewareConfig, MiddlewarePlugin, MiddlewarePlugin as default };
