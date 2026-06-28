import { pluginUtils } from '@verdaccio/core';
import { AllowAccess, Config, Logger, PackageAccess, RemoteUser } from '@verdaccio/types';
export interface AuthConfig {
    clerk_secret_key?: string;
}
type Package = PackageAccess & AllowAccess;
declare class AuthPlugin extends pluginUtils.Plugin<AuthConfig> implements pluginUtils.Auth<AuthConfig> {
    config: Config;
    logger: Logger;
    private authConfig;
    private clerkClient;
    constructor(config: AuthConfig, options: pluginUtils.PluginOptions);
    authenticate(username: string, password: string, callback: pluginUtils.AuthCallback): Promise<void>;
    private resolveUser;
    private verifyPassword;
    private getUserGroups;
    /**
     * Users are not managed by this plugin so we don't need to implement these methods
     */
    private _allow;
    /**
     * Allow access to a package
     */
    allow_access(user: RemoteUser, pkg: Package, callback: pluginUtils.AccessCallback): Promise<void>;
    /**
     * Allow publish to a package
     */
    allow_publish(user: RemoteUser, pkg: Package, callback: pluginUtils.AccessCallback): Promise<void>;
    /**
     * Allow unpublish to a package
     */
    allow_unpublish(user: RemoteUser, pkg: Package, callback: pluginUtils.AccessCallback): Promise<void>;
}
export default AuthPlugin;
