import { pluginUtils } from '@verdaccio/core';
import { Config, Logger, RemoteUser, PackageAccess } from '@verdaccio/types';

interface AuthConfig {
    url?: string;
    rounds: number;
    max_users: number;
    slow_verify_ms: number;
}
declare class AuthPlugin extends pluginUtils.Plugin<AuthConfig> implements pluginUtils.Auth<AuthConfig> {
    config: Config;
    logger: Logger;
    private authConfig;
    private db;
    private userSecretService;
    constructor(config: AuthConfig, options: pluginUtils.PluginOptions);
    authenticate(user: string, password: string, cb: pluginUtils.AuthCallback): Promise<void>;
    adduser(user: string, password: string, cb: pluginUtils.AuthUserCallback, email?: string): Promise<void>;
    removeUser(user: string): Promise<void>;
    changePassword(user: string, oldPassword: string, newPassword: string, cb: pluginUtils.AuthChangePasswordCallback): Promise<void>;
    allow_access(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AccessCallback): Promise<void>;
    allow_publish(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AuthAccessCallback): Promise<void>;
    allow_unpublish(user: RemoteUser, pkg: PackageAccess, cb: pluginUtils.AuthAccessCallback): Promise<void>;
}

export { type AuthConfig, AuthPlugin, AuthPlugin as default };
