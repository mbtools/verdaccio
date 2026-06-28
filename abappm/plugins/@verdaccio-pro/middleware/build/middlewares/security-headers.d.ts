import { RequestHandler } from 'express';
declare const setSecurityHeaders: (allowedOrigins?: string[]) => RequestHandler;
export default setSecurityHeaders;
