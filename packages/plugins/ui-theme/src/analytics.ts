import { init } from '@plausible-analytics/tracker';

import type { TemplateUIOptions } from '@verdaccio/types';

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
  }
}
