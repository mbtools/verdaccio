import { default as express } from 'express';
import { Config } from '@verdaccio/types';
declare const prototypePollutionProtection: (config: Config) => express.RequestHandler;
export default prototypePollutionProtection;
