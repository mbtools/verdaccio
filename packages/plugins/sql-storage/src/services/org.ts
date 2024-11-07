import { Logger } from '@verdaccio/types';

import { Database } from '../database';

export const PUBLIC = 1;

export class OrgService {
  private database: Database;
  private logger: Logger;

  public constructor(database: Database, logger: Logger) {
    this.database = database;
    this.logger = logger;
  }

  public getOrgId = async (name: string): Promise<number> => {
    const sql = await this.database.sql();
    const row = await sql`SELECT id FROM orgs WHERE name = ${name}`;
    if (row.length === 1) {
      return row[0].id;
    } else {
      return PUBLIC;
    }
  };

  public getOrgIdfromPackage = async (name: string): Promise<number> => {
    if (!name.includes('/')) {
      return PUBLIC;
    }
    const org = name.split('/')[0];

    const sql = await this.database.sql();
    const row = await sql`SELECT id FROM orgs WHERE name = ${org}`;

    if (row.length === 1) {
      return row[0].id;
    } else {
      return PUBLIC;
    }
  };
}
