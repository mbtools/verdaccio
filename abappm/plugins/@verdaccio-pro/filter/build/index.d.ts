import { pluginUtils } from '@verdaccio/core';
import { Config, Logger, Manifest } from '@verdaccio/types';

type PackageBlockRule = {
    scope: string;
} | {
    package: string;
} | {
    package: string;
    versions: string;
};

interface FilterConfig extends Config {
    enabled: boolean;
    block?: Array<PackageBlockRule>;
}
declare class FilterPlugin extends pluginUtils.Plugin<FilterConfig> implements pluginUtils.ManifestFilter<FilterConfig> {
    config: Config;
    logger: Logger;
    private readonly parsedConfig;
    constructor(config: FilterConfig, options: pluginUtils.PluginOptions);
    filter_metadata(packageInfo: Readonly<Manifest>): Promise<Manifest>;
}

export { type FilterConfig, FilterPlugin, FilterPlugin as default };
