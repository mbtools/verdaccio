const GITHUB_REF = 'HEAD';

export function normalizeGitHubRepositoryUrl(repositoryUrl: string): string | null {
  let url = repositoryUrl.trim();
  if (url.includes('git+')) {
    url = url.split('git+')[1];
  }
  url = url.replace(/^git@github\.com:/, 'https://github.com/');
  url = url.replace(/^git:\/\//, 'https://');
  if (!/github\.com/i.test(url)) {
    return null;
  }
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith('github.com')) {
      return null;
    }
    parsed.pathname = parsed.pathname.replace(/\.git$/, '');
    return parsed.toString().replace(/\/$/, '');
  } catch {
    return null;
  }
}

export function parseGitHubOwnerRepo(
  repositoryUrl: string
): { owner: string; repo: string } | null {
  const normalized = normalizeGitHubRepositoryUrl(repositoryUrl);
  if (!normalized) {
    return null;
  }
  const { pathname } = new URL(normalized);
  const [owner, repo] = pathname.split('/').filter(Boolean);
  if (!owner || !repo) {
    return null;
  }
  return { owner, repo };
}

export function shouldRewriteRelativeUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith('#')) {
    return false;
  }
  if (trimmed.startsWith('/-/')) {
    return false;
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    return false;
  }
  if (trimmed.startsWith('//')) {
    return false;
  }
  return true;
}

export function resolveRelativePath(relativePath: string): string {
  const segments = relativePath.split('/');
  const resolved: string[] = [];
  for (const segment of segments) {
    if (!segment || segment === '.') {
      continue;
    }
    if (segment === '..') {
      resolved.pop();
      continue;
    }
    resolved.push(segment);
  }
  return resolved.join('/');
}

function splitRelativeUrl(url: string): { path: string; suffix: string } {
  let path = url;
  let suffix = '';
  const hashIndex = path.indexOf('#');
  if (hashIndex !== -1) {
    suffix = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }
  const queryIndex = path.indexOf('?');
  if (queryIndex !== -1) {
    suffix = path.slice(queryIndex) + suffix;
    path = path.slice(0, queryIndex);
  }
  return { path, suffix };
}

export function toRawGitHubContentUrl(
  owner: string,
  repo: string,
  relativePath: string,
  ref: string = GITHUB_REF
): string {
  const { path, suffix } = splitRelativeUrl(relativePath);
  const resolvedPath = resolveRelativePath(path.replace(/^\.\//, '').replace(/^\/+/, ''));
  return `https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${resolvedPath}${suffix}`;
}

export function rewriteRelativeUrls(html: string, repositoryUrl?: string): string {
  if (!repositoryUrl || !repositoryUrl.includes('/github.com/')) {
    return html;
  }
  const ownerRepo = parseGitHubOwnerRepo(repositoryUrl);
  if (!ownerRepo) {
    return html;
  }
  const { owner, repo } = ownerRepo;

  const rewriteAttribute = (url: string): string => {
    if (!shouldRewriteRelativeUrl(url)) {
      return url;
    }
    return toRawGitHubContentUrl(owner, repo, url);
  };

  if (typeof DOMParser !== 'undefined') {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('img[src]').forEach((element) => {
      const src = element.getAttribute('src');
      if (src) {
        element.setAttribute('src', rewriteAttribute(src));
      }
    });
    doc.querySelectorAll('a[href]').forEach((element) => {
      const href = element.getAttribute('href');
      if (href) {
        element.setAttribute('href', rewriteAttribute(href));
      }
    });
    return doc.body.innerHTML;
  }

  return html
    .replace(/(<img\b[^>]*\bsrc=["'])([^"']+)(["'])/gi, (_match, prefix, src, suffix) => {
      return `${prefix}${rewriteAttribute(src)}${suffix}`;
    })
    .replace(/(<a\b[^>]*\bhref=["'])([^"']+)(["'])/gi, (_match, prefix, href, suffix) => {
      return `${prefix}${rewriteAttribute(href)}${suffix}`;
    });
}
