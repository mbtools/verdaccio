import { Database } from '../..';
import { CheckContext, CheckResult } from './types';
export declare function createEmptyResult(): CheckResult;
export declare function loadContext(db: Database): Promise<CheckContext>;
