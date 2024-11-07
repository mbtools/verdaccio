/* eslint-disable no-invalid-this */
import { Logger } from '@verdaccio/types';

import { Database } from '../database';

const SECRET_NAME = 'verdaccio';

export class VerdaccioSecretService {
  private database: Database;
  private logger: Logger;

  public constructor(database: Database, logger: Logger) {
    this.database = database;
    this.logger = logger;
  }

  public set = async (secret: string): Promise<void> => {
    this.logger.debug('[sql-storage/verdaccio-secret]: save secret');
    const sql = await this.database.sql();

    await sql`
      INSERT INTO secrets
        (name, value, created, updated, deleted)
      VALUES
        (${SECRET_NAME}, ${secret}, NOW(), NOW(), NULL)
        ON CONFLICT (name) DO UPDATE SET updated = NOW(), value = ${secret}
    `;

    this.logger.debug('[sql-storage/verdaccio-secret]: secret saved');
  };

  public get = async (): Promise<string> => {
    this.logger.debug('[sql-storage/verdaccio-secret]: get secret');
    const sql = await this.database.sql();

    const [secret] = await sql`SELECT value FROM secrets WHERE name = ${SECRET_NAME}`;

    if (secret) {
      this.logger.debug('[sql-storage/verdaccio-secret]: secret found');
    } else {
      this.logger.debug('[sql-storage/verdaccio-secret]: secret not found');
    }
    return secret ? secret.value : '';
  };
}
