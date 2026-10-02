import { Request, Response, NextFunction } from 'express';
/**
 * Removes a trailing `.git` suffix from github.com href URLs.
 * Non-GitHub URLs and URLs without a `.git` suffix are left unchanged.
 */
export declare function stripGithubGitHref(hrefValue: string): string;
/** Replaces every github.com href ending in `.git` with the suffix removed. */
export declare function stripGithubGitInString(text: string): string;
/**
 * Rewrites github.com href attributes that end in `.git` so the browser
 * opens the repository page instead of a git clone URL. JSON is left alone.
 */
declare const githubGitHref: (_req: Request, res: Response, next: NextFunction) => void;
export default githubGitHref;
