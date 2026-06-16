import { drizzle } from '../../node_modules/drizzle-orm/node-postgres';
import { Logger } from '@verdaccio/types';
export type Database = ReturnType<typeof drizzle>;
export declare const getDatabase: (url: string, logger?: Logger) => Database;
