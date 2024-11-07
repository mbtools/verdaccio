/* eslint-disable no-invalid-this */
import { Logger } from '@verdaccio/types';

import { Database } from '../database';

export class LocalPackagesService {
  private database: Database;
  private logger: Logger;

  public constructor(database: Database, logger: Logger) {
    this.database = database;
    this.logger = logger;
  }

  public add = async (name: string): Promise<void> => {
    this.logger.debug({ name }, '[sql-storage/local-package]: add private package @{name}');
    const sql = await this.database.sql();

    await sql`
      INSERT INTO local_packages
        (name, created, updated)
      VALUES
        (${name}, NOW(), NOW(), NULL)
        ON CONFLICT (name) DO UPDATE SET updated = NOW()
    `;
    this.logger.debug(
      { name },
      '[sql-storage/local-package]: the private package @{name} has been added'
    );
  };

  public remove = async (name: string): Promise<void> => {
    this.logger.debug({ name }, '[sql-storage/local-package]: remove private package @{name}');
    const sql = await this.database.sql();

    await sql`
      DELETE FROM local_packages WHERE name = ${name}
    `;
    this.logger.debug({ name }, '[sql-storage/local-package]: package @{name} has been removed');
  };

  public get = async (): Promise<string[]> => {
    this.logger.debug('[sql-storage/local-package]: get full list of private package');
    const sql = await this.database.sql();

    const rows = await sql`
      SELECT name FROM local_packages
    `;

    this.logger.debug(
      { totalItems: rows.length },
      '[sql-storage/local-package]: full list of packages (@{totalItems}) has been fetched'
    );

    return rows.map((row) => row.name);
  };

  public clean = async (): Promise<void> => {
    const sql = await this.database.sql();
    await sql`
      TRUNCATE TABLE local_packages
    `;
  };
}
