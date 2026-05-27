import { pluginUtils } from '@verdaccio/core';
import { Manifest, Config, Logger } from '@verdaccio/types';
import { PackageBlockRule } from './types';
export interface FilterConfig {
    enabled: boolean;
    block?: Array<PackageBlockRule>;
}
declare class FilterPlugin extends pluginUtils.Plugin<FilterConfig> implements pluginUtils.ManifestFilter<FilterConfig> {
    config: Config;
    logger: Logger;
    private readonly filterConfig;
    constructor(config: FilterConfig, options: pluginUtils.PluginOptions);
    filter_metadata(packageInfo: Readonly<Manifest>): Promise<Manifest>;
}
export default FilterPlugin;
