export interface CookieSessionToken {
  expires: Date;
}

export function createSessionToken(): CookieSessionToken {
  const tenHoursTime = 10 * 60 * 60 * 1000;

  return {
    // npmjs.org sets 10h expire
    expires: new Date(Date.now() + tenHoursTime),
  };
}

// @deprecated use @verdaccio/core
export function getAuthenticatedMessage(user: string): string {
  return `you are authenticated as '${user}'`;
}

// @deprecated use @verdaccio/core
export function buildUserBuffer(name: string, password: string): Buffer {
  return Buffer.from(`${name}:${password}`, 'utf8');
}

// @deprecated use @verdaccio/core
export const ROLES = {
  $ALL: '$all',
  ALL: 'all',
  $AUTH: '$authenticated',
  $ANONYMOUS: '$anonymous',
  DEPRECATED_ALL: '@all',
  DEPRECATED_AUTH: '@authenticated',
  DEPRECATED_ANONYMOUS: '@anonymous',
};

// @deprecated use @verdaccio/core
export const PACKAGE_ACCESS = {
  SCOPE: '@*/*',
  ALL: '**',
};
