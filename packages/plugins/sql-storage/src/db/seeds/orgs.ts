import type db from '../';
import { orgs } from '../schema';
import orgData from './data/orgs.json';

export default async function seed(db: db) {
  await db.insert(orgs).values(orgData);
}
