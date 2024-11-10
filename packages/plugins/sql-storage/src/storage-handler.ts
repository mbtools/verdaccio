/* eslint-disable @typescript-eslint/no-unused-vars */
import buildDebug from 'debug';
import { Readable, Writable } from 'node:stream';

import { pluginUtils } from '@verdaccio/core';
import { Logger, Manifest } from '@verdaccio/types';

import { Database } from './database';
import { PackageService } from './services/package';
import { TarballService } from './services/tarball';
import { ReadTarball, UploadTarball } from './streams';

const debug = buildDebug('verdaccio:plugin:storage:starter');

// Make linter happy
const noop = (): void => {};

class SqlStorageHandler implements pluginUtils.StorageHandler {
  public logger: Logger;
  private package: PackageService;
  private tarball: TarballService;

  public constructor(database: Database, logger: Logger, storageName: string) {
    debug('start storage handler');
    this.logger = logger;
    this.package = new PackageService(database, logger, storageName);
    this.tarball = new TarballService(database, logger, storageName);
  }

  // Package API

  public async readPackage(packageName: string): Promise<Manifest> {
    debug('read package %o', packageName);
    const manifest = {} as Manifest;
    return this.package.read(packageName);
  }

  public async hasPackage(packageName: string): Promise<boolean> {
    debug('has package %o', packageName);
    return this.package.exists(packageName);
  }

  public async updatePackage(
    packageName: string,
    handleUpdate: (manifest: Manifest) => Promise<Manifest>
  ): Promise<Manifest> {
    debug('update package %o', packageName);
    return this.package.update(packageName, handleUpdate);
  }

  public async removePackage(packageName: string): Promise<void> {
    debug('remove package %o', packageName);
    return this.package.delete(packageName);
  }

  public async createPackage(packageName: string, manifest: Manifest): Promise<void> {
    debug('create package %o', packageName);
    return this.package.create(packageName, manifest);
  }

  public async savePackage(packageName: string, manifest: Manifest): Promise<void> {
    debug('save package %o', packageName);
    return this.package.save(packageName, manifest);
  }

  // Tarball API

  public async hasTarball(fileName: string): Promise<boolean> {
    debug('has tarball %o', fileName);
    return this.tarball.exists(fileName);
  }

  public async readTarball(fileName: string, { signal }): Promise<Readable> {
    debug('read tarball %o', fileName);
    const read = new ReadTarball({});
    this.tarball.read(fileName, read);
    return read;
  }

  public async writeTarball(fileName: string, { signal }): Promise<Writable> {
    debug('write tarball %o', fileName);
    const upload = new UploadTarball({});

    let ended = false;
    upload.on('end', () => {
      ended = true;
    });

    this.tarball.write(fileName, upload);

    upload.done = (): void => {
      const onEnd = (): void => {
        upload.emit('success');
      };
      if (ended) {
        onEnd();
      } else {
        upload.on('end', onEnd);
      }
    };

    upload.abort = noop;
    return upload;
  }

  public async deleteTarball(fileName: string): Promise<void> {
    debug('delete package %o', fileName);
    return this.tarball.delete(fileName);
  }
}

export default SqlStorageHandler;
