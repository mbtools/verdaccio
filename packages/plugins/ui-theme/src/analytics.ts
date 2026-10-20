import { init, track } from '@plausible-analytics/tracker';

import type { TemplateUIOptions } from '@verdaccio/types';

function trackNotFound() {
  track('404', {});
}

export function initializeAnalytics(options: TemplateUIOptions) {
  const plausible = options.plausible;
  if (plausible?.domain && plausible.endpoint) {
    init({
      domain: plausible.domain,
      endpoint: plausible.endpoint,
      outboundLinks: true,
      fileDownloads: true,
      formSubmissions: true,
    });
    window.addEventListener('verdaccio:ui:404', trackNotFound);
    return () => window.removeEventListener('verdaccio:ui:404', trackNotFound);
  }
}
