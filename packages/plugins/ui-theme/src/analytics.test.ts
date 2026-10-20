import { init, track } from '@plausible-analytics/tracker';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { initializeAnalytics } from './analytics';

vi.mock('@plausible-analytics/tracker', () => ({ init: vi.fn(), track: vi.fn() }));

let cleanup: (() => void) | undefined;

afterEach(() => {
  cleanup?.();
  cleanup = undefined;
  vi.clearAllMocks();
});

describe('404 analytics', () => {
  test('sends the documented event through the configured tracker', () => {
    const plausible = {
      domain: 'registry.example.com',
      endpoint: 'https://stats.example.com/api/event',
    };
    cleanup = initializeAnalytics({ ...window.__VERDACCIO_BASENAME_UI_OPTIONS, plausible });

    expect(init).toHaveBeenCalledWith({
      ...plausible,
      outboundLinks: true,
      fileDownloads: true,
      formSubmissions: true,
    });
    expect(track).not.toHaveBeenCalled();

    window.dispatchEvent(new Event('verdaccio:ui:404'));
    expect(track).toHaveBeenCalledExactlyOnceWith('404', {});
  });

  test.each([
    undefined,
    { domain: '', endpoint: 'https://stats.example.com/api/event' },
    { domain: 'registry.example.com', endpoint: '' },
  ])('does not track when configuration is absent or incomplete: %j', (plausible) => {
    cleanup = initializeAnalytics({ ...window.__VERDACCIO_BASENAME_UI_OPTIONS, plausible });
    window.dispatchEvent(new Event('verdaccio:ui:404'));

    expect(init).not.toHaveBeenCalled();
    expect(track).not.toHaveBeenCalled();
  });
});
