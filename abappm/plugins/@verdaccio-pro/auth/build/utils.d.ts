import { VerdaccioError } from '@verdaccio/core';
/**
 * verifyPassword - matches password and it's hash.
 */
export declare function verifyPassword(passwd: string, hash: string): Promise<boolean>;
/**
 * hashPassword - generates a hash for a password.
 */
export declare function hashPassword(passwd: string, rounds: number): Promise<string>;
/**
 * Sanity check for a user
 */
export declare function sanityCheck(user: string, passwd: string, verifyFn: (user: string, passwd: string) => Promise<boolean>, hash: string | null, count: number, maxUsers: number): Promise<VerdaccioError | null>;
