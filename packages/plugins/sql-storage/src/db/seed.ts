import { Table, getTableName, sql } from 'drizzle-orm';

import { connection, db } from '.';
import env from '../env';
import * as schema from './schema';
import * as seeds from './seeds';

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
  return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

async function seedDatabase() {
  for (const table of [schema.orgs]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    await resetTable(db, table);
  }

  await seeds.orgs(db);

  await connection.end();
}

seedDatabase();
