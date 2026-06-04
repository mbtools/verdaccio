import { describe, expect, test } from 'vitest';

import {
  normalizeGitHubRepositoryUrl,
  rewriteRelativeUrls,
  shouldRewriteRelativeUrl,
  toRawGitHubContentUrl,
} from './rewrite-urls';

describe('rewrite-urls', () => {
  test('normalizeGitHubRepositoryUrl accepts common repository formats', () => {
    expect(normalizeGitHubRepositoryUrl('git+https://github.com/owner/repo.git')).toBe(
      'https://github.com/owner/repo'
    );
    expect(normalizeGitHubRepositoryUrl('git@github.com:owner/repo.git')).toBe(
      'https://github.com/owner/repo'
    );
  });

  test('normalizeGitHubRepositoryUrl rejects non-GitHub repositories', () => {
    expect(normalizeGitHubRepositoryUrl('https://gitlab.com/owner/repo')).toBeNull();
  });

  test('shouldRewriteRelativeUrl excludes absolute and /-/ paths', () => {
    expect(shouldRewriteRelativeUrl('img/foo.svg')).toBe(true);
    expect(shouldRewriteRelativeUrl('https://example.com/x')).toBe(false);
    expect(shouldRewriteRelativeUrl('/-/blob/main/README.md')).toBe(false);
    expect(shouldRewriteRelativeUrl('#section')).toBe(false);
  });

  test('toRawGitHubContentUrl builds raw.githubusercontent.com URLs', () => {
    expect(toRawGitHubContentUrl('owner', 'repo', 'img/abapGit_in_Ukraine_Colors.svg')).toBe(
      'https://raw.githubusercontent.com/owner/repo/HEAD/img/abapGit_in_Ukraine_Colors.svg'
    );
  });

  test('rewriteGitHubRelativeUrls rewrites img and anchor tags', () => {
    const html = '<p><img src="img/logo.svg" alt="logo" /><a href="docs/guide.md">guide</a></p>';
    const result = rewriteRelativeUrls(html, 'https://github.com/owner/repo');
    expect(result).toContain('https://raw.githubusercontent.com/owner/repo/HEAD/img/logo.svg');
    expect(result).toContain('https://raw.githubusercontent.com/owner/repo/HEAD/docs/guide.md');
  });

  test('rewriteGitHubRelativeUrls leaves /-/ paths unchanged', () => {
    const html = '<a href="/-/blob/main/README.md">readme</a>';
    const result = rewriteRelativeUrls(html, 'https://github.com/owner/repo');
    expect(result).toContain('href="/-/blob/main/README.md"');
  });
});
