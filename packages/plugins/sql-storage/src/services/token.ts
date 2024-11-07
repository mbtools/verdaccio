/* eslint-disable no-invalid-this */
import { Logger, TokenFilter, Token as VerdaccioToken } from '@verdaccio/types';

import { Database } from '../database';

export interface Token {
  user: string;
  token: string;
  key: string;
  cidr?: string[];
  readonly: boolean;
  created: Date;
  updated?: Date;
  deleted?: Date;
}

export class TokenService {
  private database: Database;
  private logger: Logger;

  public constructor(database: Database, logger: Logger) {
    this.database = database;
    this.logger = logger;
  }

  public save = async (token: VerdaccioToken): Promise<void> => {
    this.logger.debug(
      { user: token.user, key: token.key },
      '[sql-storage/token]: save token for user @{user} and key @{key}'
    );

    const sql = await this.database.sql();
    await sql`
      INSERT INTO tokens ${sql(TokenService.fromVerdaccioToken(token) as {})}
    `;

    this.logger.debug(
      { user: token.user, key: token.key },
      '[sql-storage/token]: token for user @{user} and key @{key} saved'
    );
  };

  public deleteToken = async (user: string, key: string): Promise<void> => {
    this.logger.debug(
      { user, key },
      '[sql-storage/token]: delete token for user @{user} and key @{key}'
    );

    const sql = await this.database.sql();
    await sql`
      DELETE FROM tokens WHERE user = ${user} AND key = ${key}
    `;

    this.logger.debug(
      { user, key },
      '[sql-storage/token]: token for user @{user} and key @{key} deleted'
    );
  };

  public readToken = async ({ user }: TokenFilter): Promise<VerdaccioToken[]> => {
    this.logger.debug({ user }, '[sql-storage/token]: read all token for user @{user}');

    const sql = await this.database.sql();
    const rows = await sql<Token[]>`SELECT * FROM tokens WHERE user = ${user}`;

    this.logger.debug({ user }, '[sql-storage/token]: all token for user @{user} read');
    return rows.map(TokenService.toVerdaccioToken);
  };

  public static toVerdaccioToken = (token: Token): VerdaccioToken => {
    return {
      ...token,
      created: token.created.getTime(),
      updated: token.updated && token.updated.getTime(),
    };
  };

  public static fromVerdaccioToken = (token: VerdaccioToken): Token => {
    return {
      ...token,
      created: new Date(token.created),
      updated: (token.updated && new Date(token.updated)) || undefined,
    };
  };
}
