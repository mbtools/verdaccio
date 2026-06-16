const REDACTED = '<Classified>';

function sanitizePathname(pathname: string): string {
  return pathname
    .replace(/(\/-\/user\/token\/).+/i, `$1${REDACTED}`)
    .replace(/(\/-\/v1\/(?:done|login_cli)\/).+/i, `$1${REDACTED}`)
    .replace(/(\/-\/npm\/v1\/tokens\/token\/).+/i, `$1${REDACTED}`)
    .replace(/(\/-\/user\/org\.couchdb\.user:).+/i, `$1${REDACTED}`);
}

function sanitizeSearch(search: string): string {
  if (!search) {
    return search;
  }

  return search.replace(/([?&]next=)([^&]*)/gi, (match, prefix, value) => {
    let decoded = value;
    try {
      decoded = decodeURIComponent(value);
    } catch {
      return match;
    }

    const sanitized = decoded.replace(/(\/-\/v1\/login_cli\/).+/i, `$1${REDACTED}`);
    if (sanitized === decoded) {
      return match;
    }

    return `${prefix}${encodeURIComponent(sanitized)}`;
  });
}

/**
 * Redacts sensitive path segments and query values before writing URLs to logs.
 */
export function sanitizeUrlForLog(url: string): string {
  if (!url) {
    return url;
  }

  const hashIndex = url.indexOf('#');
  const hash = hashIndex >= 0 ? url.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const queryIndex = withoutHash.indexOf('?');
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const search = queryIndex >= 0 ? withoutHash.slice(queryIndex) : '';

  return sanitizePathname(pathname) + sanitizeSearch(search) + hash;
}
