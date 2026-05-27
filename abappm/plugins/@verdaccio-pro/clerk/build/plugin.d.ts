import { pluginUtils } from '@verdaccio/core';
import { Config, Logger, PackageAccess, RemoteUser } from '@verdaccio/types';
export interface AuthConfig {
    clerk_publishable_key?: string;
}
declare class AuthPlugin extends pluginUtils.Plugin<AuthConfig> implements pluginUtils.Auth<AuthConfig> {
    config: Config;
    logger: Logger;
    private authConfig;
    private clerk;
    private readonly clerkLoadPromise;
    constructor(config: AuthConfig, options: pluginUtils.PluginOptions);
    authenticate(user: string, password: string, cb: pluginUtils.AuthCallback): Promise<void>;
    private getUserGroups;
    adduser(user: string, password: string, cb: pluginUtils.AuthUserCallback, email?: string): Promise<void>;
    removeUser(user: string): Promise<void>;
    changePassword(user: string, oldPassword: string, newPassword: string, cb: pluginUtils.AuthChangePasswordCallback): Promise<void>;
    allow_access(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AuthAccessCallback): Promise<void>;
    allow_publish(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AuthAccessCallback): Promise<void>;
    allow_unpublish(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AuthAccessCallback): Promise<void>;
}
export default AuthPlugin;
