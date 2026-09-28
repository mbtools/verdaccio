import { Request, Response, NextFunction } from 'express';
/** Encodes the address portion of a mailto URL as HTML decimal entities. */
export declare function obfuscateMailtoHref(hrefValue: string): string;
/** Replaces every mailto href in an HTML fragment with an obfuscated form. */
export declare function obfuscateMailtoInString(text: string): string;
/**
 * Rewrites mailto href attributes in HTML responses so scrapers cannot
 * match plain email addresses in the raw markup. JSON responses are left alone.
 */
declare const emailObfuscation: (_req: Request, res: Response, next: NextFunction) => void;
export default emailObfuscation;
