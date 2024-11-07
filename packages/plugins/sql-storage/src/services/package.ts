import { errorUtils, searchUtils } from '@verdaccio/core';
import { Callback, Logger, Manifest } from '@verdaccio/types';

import { Database } from '../database';
import { OrgService } from './org';

export class PackageService {
  private database: Database;
  private logger: Logger;

  private storage: string;
  private name: string;
  private org: OrgService;

  public static search = async (
    database: Database,
    query: searchUtils.SearchQuery
  ): Promise<searchUtils.SearchItemPkg[]> => {
    const sql = await database.sql();
    // TODO: cache and return requested slice of the results
    const results: searchUtils.SearchItemPkg[] = [];
    const rows = await sql`
      SELECT name, json, updated FROM packages
      WHERE json->>'name' ILIKE ${query.text}
      ORDER BY name
    `;
    for (const row of rows) {
      results.push({
        name: row.name,
        scoped: undefined,
        path: undefined,
        time: row.updated,
      });
    }
    return results.slice(query.from, query.size);
  };

  public constructor(database: Database, logger: Logger, storage: string, name: string) {
    this.database = database;
    this.logger = logger;
    this.storage = storage;
    this.name = name;
    this.org = new OrgService(database, logger);
  }

  public create = async (name: string, json: Manifest): Promise<void> => {
    this.logger.debug({ name }, '[sql-storage/package] create package @{name}');

    await this.save(name, json);

    this.logger.debug({ name }, '[sql-storage/package] package @{name} created');
  };

  public save = async (name: string, json: Manifest): Promise<void> => {
    this.logger.debug({ name }, '[sql-storage/package] save package @{name}');

    const sql = await this.database.sql();
    const orgId = await this.org.getOrgIdfromPackage(name);

    await sql`
      INSERT INTO packages
        (org_id, storage, name, json)
      VALUES
        (${orgId}, ${this.storage}, ${name}, ${JSON.stringify(json)})
      ON CONFLICT (org_id, storage, name)
      DO UPDATE
      SET
        json = ${JSON.stringify(json)},
        updated = NOW()
    `;

    this.logger.debug({ name }, '[sql-storage/package] package @{name} saved');
  };

  public update = async (name: string, handleUpdate: Callback): Promise<Manifest> => {
    this.logger.debug({ name }, '[sql-storage/package] update package @{name}');

    const manifest = await this.read(name);
    const manifestUpdated = await handleUpdate(manifest);
    await this.save(name, manifestUpdated);

    this.logger.debug({ name }, '[sql-storage/package] package @{name} updated');

    return manifestUpdated;
  };

  public read = async (name: string): Promise<Manifest> => {
    this.logger.debug({ name }, '[sql-storage/package] read package @{name}');

    const sql = await this.database.sql();
    const orgId = await this.org.getOrgIdfromPackage(name);

    const [pkg] = await sql`
      SELECT json FROM packages
        WHERE org_id = ${orgId} AND storage = ${this.storage} AND name = ${name}
    `;

    if (!pkg) {
      throw errorUtils.getNotFound();
    }

    this.logger.debug({ name }, '[sql-storage/package] package @{name} read');

    return pkg.json;
  };

  public delete = async (): Promise<void> => {
    this.logger.debug({ name: this.name }, '[sql-storage/package] delete package @{name}');

    const sql = await this.database.sql();
    const orgId = await this.org.getOrgIdfromPackage(this.name);

    await sql`DELETE FROM packages 
      WHERE org_id = ${orgId} AND storage = ${this.storage} AND name = ${this.name}`;

    this.logger.debug({ name: this.name }, '[sql-storage/package] deleted package @{name}');
  };
}
