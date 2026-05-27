import { DefaultLogger } from 'drizzle-orm/logger';
import { Logger } from '@verdaccio/types';
export declare const loggerFactory: (logger?: Logger) => DefaultLogger | undefined;
