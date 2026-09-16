import { NextFunction, Request, Response } from 'express';
export declare const JWT_AUTH_REALM = "Verdaccio Pro";
/**
 * Express middleware that requires a Verdaccio JWT Bearer token.
 * Relies on Verdaccio's JWT middleware having already resolved the token
 * onto `req.remote_user`. Authorized users must belong to the `@apm` group.
 */
declare const requireJwtAuth: () => (req: Request, res: Response, next: NextFunction) => void;
export default requireJwtAuth;
