import buildDebug from 'debug';
import type { Response } from 'express';
import LRU from 'lru-cache';

import { HEADERS } from '@verdaccio/core';
import { ConfigYaml, TemplateUIOptions } from '@verdaccio/types';

import type { Manifest } from './manifest';
import renderTemplate, { type WebpackManifest } from './template';

const cache = new LRU({ max: 500, ttl: 1000 * 60 * 60 });

const debug = buildDebug('verdaccio:web:render');

const defaultManifestFiles: Manifest = {
  js: ['runtime.js', 'vendors.js', 'main.js'],
  ico: 'favicon.ico',
  css: [],
};

export default function renderHTML(
  config: ConfigYaml,
  manifest: WebpackManifest,
  manifestFiles: Manifest | null | undefined,
  options: TemplateUIOptions,
  res: Response
) {
  // @ts-ignore
  const needHtmlCache = [undefined, null].includes(config?.web?.html_cache)
    ? true
    : config?.web?.html_cache;

  const scriptsBodyBefore = config?.web?.scriptsBodyBefore || config?.web?.scriptsbodyBefore || [];
  const scriptsBodyAfter = config?.web?.scriptsBodyAfter || [];
  const metaScripts = config?.web?.metaScripts || [];

  let webPage;

  let cacheKey = `template:${JSON.stringify(options)}`;

  try {
    webPage = cache.get(cacheKey);
    if (!webPage) {
      webPage = renderTemplate(
        {
          manifest: manifestFiles ?? defaultManifestFiles,
          options,
          scriptsBodyAfter,
          metaScripts,
          scriptsBodyBefore,
        },
        manifest
      );

      if (needHtmlCache) {
        cache.set(cacheKey, webPage);
        debug('set template cache');
      }
    } else {
      debug('reuse template cache');
    }
  } catch (error: any) {
    throw new Error(`theme could not be load, stack ${error.stack}`);
  }
  res.setHeader('Content-Type', HEADERS.TEXT_HTML);
  res.send(webPage);
  debug('web rendered');
}
