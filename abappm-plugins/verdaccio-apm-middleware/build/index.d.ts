import { Express } from 'express';
import { pluginUtils } from '@verdaccio/core';
import { Config, Logger } from '@verdaccio/types';

interface CustomConfig extends Config {
    enabled: boolean;
}
declare class APMMiddlewarePlugin extends pluginUtils.Plugin<CustomConfig> implements pluginUtils.ExpressMiddleware<CustomConfig, pluginUtils.Storage<CustomConfig>, pluginUtils.Auth<CustomConfig>> {
    config: Config;
    logger: Logger;
    private pluginConfig;
    constructor(config: CustomConfig, options: pluginUtils.PluginOptions);
    register_middlewares(app: Express, auth: pluginUtils.Auth<CustomConfig>, storage: pluginUtils.Storage<CustomConfig>): void;
}

export { APMMiddlewarePlugin as default };
