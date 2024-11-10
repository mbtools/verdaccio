import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { connection, db } from '.';
import config from '../drizzle.config';
import env from '../env';

if (!env.DB_MIGRATING) {
  throw new Error('You must set DB_MIGRATING to "true" when running migrations');
}

async function runMigrations() {
  await migrate(db, { migrationsFolder: config.out! });
  await connection.end();
}

runMigrations().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
