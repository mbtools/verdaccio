import { PassThrough, Writable } from 'node:stream';

import { pluginUtils } from '@verdaccio/core';
import { Logger, Manifest } from '@verdaccio/types';

import { Database } from './database';
import { PackageService } from './services/package';
import { TarballService } from './services/tarball';
import { ReadTarball, UploadTarball } from './streams';

const noop = (): void => {
  // Make linter happy
};

export class PGPackageManager implements pluginUtils.StorageHandler {
  public logger: Logger;

  private package: PackageService;
  private tarball: TarballService;

  public constructor(database: Database, logger: Logger, storage: string, name: string) {
    this.logger = logger;
    this.package = new PackageService(database, logger, storage, name);
    this.tarball = new TarballService(database, logger, storage, name);
  }

  public async updatePackage(
    name: string,
    handleUpdate: (manifest: Manifest) => Promise<Manifest>
  ): Promise<Manifest> {
    return this.package.update(name, handleUpdate);
  }

  public async deletePackage(name: string): Promise<void> {
    if (name === 'package.json') {
      await this.package.delete();
    } else {
      await this.tarball.delete(name);
    }
  }

  public async removePackage(): Promise<void> {
    await this.package.delete();
    await this.tarball.remove();
  }

  public async hasPackage(): Promise<boolean> {
    // TODO: implement
    return Promise.resolve(false);
  }

  public async createPackage(name: string, value: Manifest): Promise<void> {
    this.package.create(name, value);
  }

  public async savePackage(name: string, value: Manifest): Promise<void> {
    this.package.save(name, value);
  }

  public async readPackage(name: string): Promise<Manifest> {
    return this.package.read(name);
  }

  public async hasTarball(fileName: string): Promise<boolean> {
    return this.tarball.exists(fileName);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async readTarball(name: string, { signal }): Promise<PassThrough> {
    const read = new ReadTarball({});

    this.tarball.read(name, read);

    return read;
  }

  public async writeTarball(name: string): Promise<Writable> {
    const upload = new UploadTarball({});
    let ended = false;
    upload.on('end', () => {
      ended = true;
    });

    this.tarball.write(name, upload);

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
}
