import buildDebug from 'debug';
import type { IncomingHttpHeaders } from 'node:http';

import type { RequestOptions } from '@verdaccio/url';

import type { $RequestExtend } from '../types';
import { sanitizeUrlForLog } from './sanitize-url';

const debug = buildDebug('verdaccio+:middleware:request-options');

export function getRequestOptions(req: $RequestExtend): RequestOptions {
  const requestOptions = {
    // Express 5:
    // - req.host is fully supported and includes the port
    // - https://expressjs.com/en/api.html#req.host
    host: req.host,
    protocol: req.protocol,
    headers: req.headers as IncomingHttpHeaders,
    remoteAddress: req.socket.remoteAddress,
    byPassCache: req.query.write === 'true',
    username: req.remote_user?.name ?? undefined,
  };

  // apm: mask sensitive headers before debug output
  const maskedRequestOptions = {
    ...requestOptions,
    url: sanitizeUrlForLog(req.originalUrl ?? req.url ?? ''),
    headers: {
      ...requestOptions.headers,
      cookie: '<Classified>',
      authorization: '<Classified>',
    },
  };

  debug('request options: %o', maskedRequestOptions);
  return requestOptions;
}
