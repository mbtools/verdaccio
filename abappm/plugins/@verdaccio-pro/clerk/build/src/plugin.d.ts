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
    authenticate(user: string, password: string, callback: pluginUtils.AuthCallback): Promise<void>;
    private resolveUser;
    private getUserGroups;
    adduser(user: string, password: string, callback: pluginUtils.AuthUserCallback, email?: string): Promise<void>;
    removeUser(user: string): Promise<void>;
    changePassword(user: string, oldPassword: string, newPassword: string, callback: pluginUtils.AuthChangePasswordCallback): Promise<void>;
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
