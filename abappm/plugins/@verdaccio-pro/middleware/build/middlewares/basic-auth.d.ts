import { NextFunction, Request, Response } from 'express';
export declare const DASHBOARD_AUTH_REALM = "Verdaccio Pro Dashboard";
export declare const DASHBOARD_USER_ENV = "VERDACCIO_DASHBOARD_USER";
export declare const DASHBOARD_PASSWORD_ENV = "VERDACCIO_DASHBOARD_PASSWORD";
type BasicAuthOptions = {
    user?: string;
    password?: string;
};
export default function requireBasicAuth(options?: BasicAuthOptions): (req: Request, res: Response, next: NextFunction) => void;
export {};
