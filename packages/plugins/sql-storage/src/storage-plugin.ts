import buildDebug from 'debug';
import _ from 'lodash';

import { pluginUtils, searchUtils } from '@verdaccio/core';
import { Config, Logger, Token, TokenFilter } from '@verdaccio/types';

import { Database } from './database';
import env from './env';
import { LocalPackagesService } from './services/local-package';
import { PackageService } from './services/package';
import { TokenService } from './services/token';
import { VerdaccioSecretService } from './services/verdaccio-secret';
import SqlStorageHandler from './storage-handler';

export type StorageConfig = {
  url: string;
  default_storage: string;
};

const debug = buildDebug('verdaccio:plugin:storage:sql');

class SqlStoragePlugin
  extends pluginUtils.Plugin<StorageConfig>
  implements pluginUtils.Storage<StorageConfig>
{
  public logger: Logger;
  public config: Config;
  private sqlConfig: StorageConfig;
  private database: Database;
  private token: TokenService;
  private localPackage: LocalPackagesService;
  private verdaccioSecret: VerdaccioSecretService;
  private storageCache?: Map<string, SqlStorageHandler>;

  public constructor(config: StorageConfig, options: pluginUtils.PluginOptions) {
    debug('start storage plugin');
    super(config, options);
    this.config = options.config;
    this.logger = options.logger;

    this.sqlConfig = config;
    this.sqlConfig.url = env.DATABASE_URL || config.url;
    if (!this.sqlConfig.url) {
      throw new Error(
        '[sql-storage] missing config. Add `store.sql-storage.url` to your config file or use environtment DATABASE_URL'
      );
    }
    if (!this.sqlConfig.default_storage) {
      this.sqlConfig.default_storage = 'default';
    }

    debug('config: %o', this.sqlConfig);

    this.database = new Database(this.sqlConfig.url);
    this.token = new TokenService(this.database, this.logger);
    this.localPackage = new LocalPackagesService(this.database, this.logger);
    this.verdaccioSecret = new VerdaccioSecretService(this.database, this.logger);
  }

  public init() {
    debug('init plugin');
    return Promise.resolve();
  }

  // Storage API

  public getPackageStorage(packageName: string): SqlStorageHandler {
    debug('get storage handler for %o', packageName);

    const access = this.config.getMatchedPackagesSpec(packageName);
    const storageName = (access && access.storage) || this.sqlConfig.default_storage;

    if (!this.storageCache) {
      this.storageCache = new Map<string, SqlStorageHandler>();
    }
    if (!this.storageCache.has(storageName)) {
      this.storageCache.set(
        storageName,
        new SqlStorageHandler(this.database, this.logger, storageName)
      );
    }

    return this.storageCache.get(storageName)!;
  }

  // Secret API

  public getSecret(): Promise<string> {
    debug('get secret');
    return this.verdaccioSecret.get();
  }

  public setSecret(secret: string): Promise<string | null> {
    debug('set secret to %o', '***');
    return this.verdaccioSecret.set(secret);
  }

  // Package API

  public async get(): Promise<string[]> {
    debug('get complete package list');
    return this.localPackage.get();
  }

  public async add(packageName: string): Promise<void> {
    debug('add package %o', packageName);
    return this.localPackage.add(packageName);
  }

  public async remove(packageName: string): Promise<void> {
    debug('remove package %o', packageName);
    return this.localPackage.remove(packageName);
  }

  public async search(query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]> {
    debug('search for %o', query.text);
    const results: searchUtils.SearchItem[] = [];

    const localResults = await PackageService.search(this.database, query);
    debug('total results %o', localResults.length);

    const filteredResults = await this.filterByQuery(localResults, query);
    debug('filtered results %o', filteredResults.length);

    const allPackages = await this.get();
    for (let result of filteredResults) {
      const isPrivate = allPackages.includes(result.name);
      const score = await this.getScore(result);
      results.push({
        package: result,
        verdaccioPrivate: isPrivate,
        verdaccioPkgCached: !isPrivate,
        score,
      });
    }

    return results;
  }

  private async filterByQuery(
    results: searchUtils.SearchItemPkg[],
    query: searchUtils.SearchQuery
  ) {
    // FUTURE: apply new filters, keyword, version, ...
    return results.filter((item: searchUtils.SearchItemPkg) => {
      // Sanitize user input
      const safeText = _.escapeRegExp(query.text);
      return item?.name?.match(safeText) !== null;
    }) as searchUtils.SearchItemPkg[];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async getScore(item: searchUtils.SearchItemPkg): Promise<searchUtils.Score> {
    // TODO: there is no particular reason to predefined scores
    return Promise.resolve({
      final: 1,
      detail: {
        maintenance: 0,
        popularity: 1,
        quality: 1,
      },
    });
  }

  // Token API

  public async readTokens(filter: TokenFilter): Promise<Token[]> {
    debug('get tokens for user %o', filter.user);
    return this.token.readToken(filter);
  }

  public async saveToken(token: Token): Promise<any> {
    debug('save token for user %o', token.user);
    return this.token.save(token);
  }

  public async deleteToken(user: string, tokenKey: string): Promise<any> {
    debug('delete token for user %o and token %o', user, tokenKey);
    return this.token.deleteToken(user, tokenKey);
  }
}

export default SqlStoragePlugin;
