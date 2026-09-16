import { NextFunction, Request, Response } from 'express';
import { RemoteUser } from '@verdaccio/types';
export declare const BASIC_AUTH_REALM = "Verdaccio Pro";
export type AuthenticateAuth = {
    authenticate(user: string, password: string, cb: (error: Error | null, remoteUser?: RemoteUser | false) => void): void;
};
/**
 * Express middleware that challenges with HTTP Basic Auth and validates
 * credentials through Verdaccio's `auth.authenticate`. Authorized users
 * must belong to the `admin` group.
 */
declare const requireBasicAuth: (auth: AuthenticateAuth) => (req: Request, res: Response, next: NextFunction) => void;
export default requireBasicAuth;
