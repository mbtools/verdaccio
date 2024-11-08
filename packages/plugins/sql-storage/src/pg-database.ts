import env from '@/env';
import buildDebug from 'debug';
import _ from 'lodash';

import { pluginUtils, searchUtils } from '@verdaccio/core';
import { Logger, Token, TokenFilter } from '@verdaccio/types';

import { PGConfig } from './config';
import { Database } from './database';
import { PGPackageManager } from './pg-fs';
import { LocalPackagesService } from './services/local-package';
import { PackageService } from './services/package';
import { TokenService } from './services/token';
import { VerdaccioSecretService } from './services/verdaccio-secret';

const debug = buildDebug('verdaccio:plugin:loader:utils');

class PGDatabase extends pluginUtils.Plugin<PGConfig> implements pluginUtils.Storage<PGConfig> {
  public readonly config: PGConfig;

  private logger: Logger;
  private database: Database;
  private token: TokenService;
  private localPackage: LocalPackagesService;
  private verdaccioSecret: VerdaccioSecretService;

  public constructor(config: PGConfig, logger: Logger) {
    debug('constructor');
    super(config, { config, logger });

    this.config = config;
    this.logger = logger;

    if (!config) {
      throw new Error('[sql-storage] missing config. Add `store.sql-storage` to your config file');
    }
    this.config = Object.assign(config, config.store['sql-storage']);

    this.config.url = env.DATABASE_URL || this.config.url;
    if (!this.config.url) {
      throw new Error(
        '[sql-storage] missing config. Add `store.sql-storage.url` to your config file or use environtment POSTGRES_URL'
      );
    }

    this.logger.debug(
      { config: JSON.stringify(this.config, null, 4) },
      '[sql-storage]: configuration: @{config}'
    );

    this.database = new Database(this.config.url);
    this.token = new TokenService(this.database, this.logger);
    this.localPackage = new LocalPackagesService(this.database, this.logger);
    this.verdaccioSecret = new VerdaccioSecretService(this.database, this.logger);
  }

  public async init(): Promise<void> {}

  public async getSecret(): Promise<string> {
    return this.verdaccioSecret.get();
  }

  public async setSecret(secret: string): Promise<void> {
    this.verdaccioSecret.set(secret);
  }

  public async add(name: string): Promise<void> {
    this.localPackage.add(name);
  }

  /**
   * Filter and only match those values that the query define.
   **/
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
  private async getScore(_pkg: searchUtils.SearchItemPkg): Promise<searchUtils.Score> {
    // TODO: there is no particular reason to predefined scores could be improved by using
    return Promise.resolve({
      final: 1,
      detail: {
        maintenance: 0,
        popularity: 1,
        quality: 1,
      },
    });
  }

  public async search(query: searchUtils.SearchQuery): Promise<searchUtils.SearchItem[]> {
    this.logger.debug({ text: query.text }, '[sql-storage/package] search for: @{text}');

    const results: searchUtils.SearchItem[] = [];

    const localResults = await PackageService.search(this.database, query);

    this.logger.debug(
      { count: localResults.length },
      '[sql-storage/package] total results: @{count}'
    );

    const filteredResults = await this.filterByQuery(localResults, query);

    this.logger.debug(
      { count: filteredResults.length },
      '[sql-storage/package] filtered results: @{count}'
    );

    for (let result of filteredResults) {
      // TODO: check if package is listed on the cache private database
      // const isPrivate = (this.data as LocalStorage).list.includes(result.name);
      const isPrivate = true;
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

  public async remove(name: string): Promise<void> {
    this.localPackage.remove(name);
  }

  public async get(): Promise<any> {
    return this.localPackage.get();
  }

  public getPackageStorage(name: string): pluginUtils.StorageHandler {
    const access = this.config.getMatchedPackagesSpec(name);
    const storage = (access && access.storage) || this.config.storage || 'default';
    return new PGPackageManager(this.database, this.logger, storage, name);
  }

  public async clean(): Promise<void> {
    this.localPackage.clean();
  }

  public async saveToken(token: Token): Promise<void> {
    this.token.save(token);
  }

  public async deleteToken(user: string, tokenKey: string): Promise<void> {
    this.token.deleteToken(user, tokenKey);
  }

  public async readTokens(filter: TokenFilter): Promise<Token[]> {
    return this.token.readToken(filter);
  }
}

export default PGDatabase;
