/* eslint-disable no-invalid-this */
import postgres from 'postgres';

import { errorUtils } from '@verdaccio/core';

export class Database {
  private _sql: postgres.Sql<any>;
  public ready: Promise<boolean>;

  public constructor(url: string) {
    this._sql = postgres(url);
    this.ready = this.initialize();
  }

  public sql = async (): Promise<postgres.Sql<{}>> => {
    try {
      await this.ready;
    } catch (err) {
      throw errorUtils.getServiceUnavailable(
        `[sql-storage/database]: can't get database ready with error ${(err as Error).message}`
      );
    }
    return this._sql;
  };

  private initialize = async (): Promise<boolean> => {
    // await migrations.up(this._sql);
    return true;
  };
}
