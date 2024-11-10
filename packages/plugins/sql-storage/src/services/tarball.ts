/* eslint-disable no-invalid-this */
import { LargeObjectManager } from 'postgres-large-object';

import { Logger } from '@verdaccio/types';

import { Database } from '../database';
import { ReadTarball, UploadTarball } from '../streams';
import { OrgService } from './org';

export class TarballService {
  private database: Database;
  private logger: Logger;

  private storage: string;
  private org: OrgService;

  public constructor(database: Database, logger: Logger, storage: string) {
    this.database = database;
    this.logger = logger;
    this.storage = storage;
    this.org = new OrgService(database, logger);
  }

  public exists = async (name: string): Promise<boolean> => {
    this.logger.debug(
      { name },
      '[sql-storage/tarball] check if tarball exists for package @{name}'
    );
    const sql = await this.database.sql();
    const orgId = await this.org.getOrgIdfromPackage(name);

    const [exists] = await sql`
      SELECT name FROM tarball
        WHERE org_id = ${orgId} AND storage = ${this.storage} AND name = ${name}
    `;

    this.logger.debug(
      { exists: Boolean(exists) },
      '[sql-storage/tarball] tarball exists: @{exists}'
    );

    return Boolean(exists);
  };

  public read = async (filename: string, read: ReadTarball): Promise<void> => {
    this.logger.debug({ filename }, '[sql-storage/package] read tarball @{filename}');

    const { name } = this.getPackageInfoFromFilename(filename);

    const sql = await this.database.sql();
    const orgId = await this.org.getOrgIdfromPackage(name);

    await sql.begin(async (trx) => {
      const manager = new LargeObjectManager(trx as any);
      const [{ data }] = await trx`
        SELECT data FROM tarball
          WHERE org_id = ${orgId} AND storage = ${this.storage} AND name = ${name} AND filename = ${filename}
      `;

      const [size, stream] = await manager.openAndReadableStreamAsync(data);

      read.emit('content-length', size);
      read.emit('open');

      stream.pipe(read);

      await new Promise((resolve, reject) => {
        stream.on('end', resolve);
        stream.on('error', reject);
      });
    });

    this.logger.debug({ filename }, '[sql-storage/package] tarball @{filename} read');
  };

  public write = async (filename: string, upload: UploadTarball): Promise<void> => {
    this.logger.debug({ filename }, '[sql-storage/tarball] write tarball @{filename}');

    const { name, version } = this.getPackageInfoFromFilename(filename);

    const sql = await this.database.sql();
    const orgId = await this.org.getOrgIdfromPackage(name);

    await sql.begin(async (trx) => {
      const manager = new LargeObjectManager(trx as any);
      const [exists] = await trx`
        SELECT name FROM tarball
          WHERE org_id = ${orgId} AND storage = ${this.storage} AND name = ${name} AND filename = ${filename}
      `;

      const [oid, stream] = await manager.createAndWritableStreamAsync();

      upload.pipe(stream);
      upload.emit('open');

      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', resolve);
      });

      await trx`
        INSERT INTO tarball
          (org_id, storage, name, version, filename, data)
        VALUES
          (${orgId}, ${this.storage}, ${name}, ${version}, ${filename}, ${oid})
        ON CONFLICT (storage, package, name)
        DO UPDATE
        SET
          data = ${oid},
          updated = NOW()
      `;

      if (exists) {
        await manager.unlinkAsync(exists.file);
      }
    });

    this.logger.debug({ filename }, '[sql-storage] tarball @{filename} written');
  };

  public delete = async (filename: string): Promise<void> => {
    this.logger.debug({ filename }, '[sql-storage] delete tarball @{filename}');

    const { name } = this.getPackageInfoFromFilename(filename);

    const sql = await this.database.sql();
    const orgId = await this.org.getOrgIdfromPackage(name);

    await sql.begin(async (trx) => {
      const manager = new LargeObjectManager(trx as any);
      const rows = await trx`
        DELETE FROM tarball 
          WHERE org_id = ${orgId} AND storage = ${this.storage} AND name = ${name} 
          AND filename = ${filename} RETURNING *
      `;

      for (const row of rows) {
        await manager.unlinkAsync(row.file);
      }
    });

    this.logger.debug({ filename }, '[sql-storage] tarball @{filename} deleted');
  };

  public remove = async (name: string): Promise<void> => {
    this.logger.debug({ name }, '[sql-storage] remove all tarballs for package: @{name}');

    const sql = await this.database.sql();
    const orgId = await this.org.getOrgIdfromPackage(name);

    await sql.begin(async (trx) => {
      const manager = new LargeObjectManager(trx as any);
      const rows = await trx`
        DELETE FROM tarball 
          WHERE org_id = ${orgId} AND storage = ${this.storage} AND name = ${name} RETURNING *
      `;
      for (const row of rows) {
        await manager.unlinkAsync(row.file);
      }
    });

    this.logger.debug({ name }, '[sql-storage] all tarballs for package @{name} removed');
  };

  private getPackageInfoFromFilename(filename: string): { name: string; version: string } {
    // filename is in the format of `name-version.tgz`
    const match = filename.match(/^(.*)-(.*)\.tgz$/);
    if (!match) {
      throw new Error(`Invalid tarball filename: ${filename}`);
    }
    return { name: match[1], version: match[2] };
  }
}
