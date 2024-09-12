import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

// eslint-disable-next-line jest/no-mocks-import
import { generateTokenWithTimeRange } from '../../__mocks__/token';

describe('getDefaultUserState', (): void => {
  const username = 'xyz';

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should return state with empty user', async (): Promise<void> => {
    const token = 'token-xx-xx-xx';

    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    // Import the function after mocking
    const { getDefaultUserState } = await import('./login');

    const result = {
      token: null,
      username: null,
    };
    expect(getDefaultUserState()).toEqual(result);
  });

  test('should return state with user from storage', async (): Promise<void> => {
    const token = generateTokenWithTimeRange(24);

    localStorage.setItem('token', token);
    localStorage.setItem('username', username);

    // Import the function after mocking
    const { getDefaultUserState } = await import('./login');

    const result = {
      token,
      username,
    };
    expect(getDefaultUserState()).toEqual(result);
  });
});
