import { describe, expect, test } from 'vitest';

import { sanitizeUrlForLog } from '../src/middlewares/sanitize-url';

const REDACTED = '<Classified>';
const sessionId = '550e8400-e29b-41d4-a716-446655440000';
const tokenKey = 'a1b2c3d4e5f67890';
const authToken = 'npm_abcdefghijklmnopqrstuvwxyz';

describe('sanitizeUrlForLog', () => {
  test('should redact legacy npm logout token path', () => {
    expect(sanitizeUrlForLog(`/-/user/token/npm:${authToken}`)).toBe(`/-/user/token/${REDACTED}`);
  });

  test('should redact web login session paths', () => {
    expect(sanitizeUrlForLog(`/-/v1/done/${sessionId}`)).toBe(`/-/v1/done/${REDACTED}`);
    expect(sanitizeUrlForLog(`/-/v1/login_cli/${sessionId}`)).toBe(`/-/v1/login_cli/${REDACTED}`);
  });

  test('should redact npm token revoke path', () => {
    expect(sanitizeUrlForLog(`/-/npm/v1/tokens/token/${tokenKey}`)).toBe(
      `/-/npm/v1/tokens/token/${REDACTED}`
    );
  });

  test('should redact couchdb username in path', () => {
    expect(sanitizeUrlForLog('/-/user/org.couchdb.user:jota')).toBe(
      `/-/user/org.couchdb.user:${REDACTED}`
    );
    expect(sanitizeUrlForLog('/-/user/org.couchdb.user:jota/-rev/1-abc')).toBe(
      `/-/user/org.couchdb.user:${REDACTED}`
    );
  });

  test('should redact encoded web login next query parameter', () => {
    const next = encodeURIComponent(`/-/v1/login_cli/${sessionId}`);
    expect(sanitizeUrlForLog(`/-/web/login?next=${next}`)).toBe(
      `/-/web/login?next=${encodeURIComponent(`/-/v1/login_cli/${REDACTED}`)}`
    );
  });

  test('should leave safe URLs unchanged', () => {
    expect(sanitizeUrlForLog('/react')).toBe('/react');
    expect(sanitizeUrlForLog('/-/whoami')).toBe('/-/whoami');
    expect(sanitizeUrlForLog('/-/npm/v1/tokens')).toBe('/-/npm/v1/tokens');
    expect(sanitizeUrlForLog('/-/v1/search?text=react&size=20')).toBe(
      '/-/v1/search?text=react&size=20'
    );
  });
});
