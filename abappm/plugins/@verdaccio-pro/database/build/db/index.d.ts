import { drizzle } from '../../node_modules/drizzle-orm/node-postgres';
import { Logger } from '@verdaccio/types';
export type Database = ReturnType<typeof drizzle>;
export declare const getDatabase: (url: string, logger?: Logger) => Database;
/** Drop a cached pool so the next getDatabase() opens a fresh connection. */
export declare const resetDatabaseConnection: (url: string) => Promise<void>;
