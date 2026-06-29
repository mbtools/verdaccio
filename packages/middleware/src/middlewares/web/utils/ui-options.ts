import type { Response } from 'express';
import path from 'node:path';
import { URL } from 'node:url';

import { WEB_DEFAULT_LANGUAGE, WEB_PRIMARY_COLOR, WEB_TITLE } from '@verdaccio/config';
import type { ConfigYaml, TemplateUIOptions } from '@verdaccio/types';
import { type RequestOptions, getPublicUrl, isURLhasValidProtocol } from '@verdaccio/url';

import { hasLogin, validatePrimaryColor } from './web-utils';

function resolveLogo(logo: string | undefined, base: string) {
  if (typeof logo !== 'string') {
    return '';
  }
  const isLocalFile = logo && !isURLhasValidProtocol(logo);

  if (isLocalFile) {
    return `${base}-/static/${path.basename(logo)}`;
  } else if (isURLhasValidProtocol(logo)) {
    return logo;
  } else {
    return '';
  }
}

export function getUIOptions(
  config: ConfigYaml,
  requestOptions: RequestOptions,
  res: Response
): TemplateUIOptions {
  const { url_prefix } = config;
  const base = getPublicUrl(config?.url_prefix, requestOptions);
  const basename = URL.canParse(base) ? new URL(base).pathname : base;
  const language = config?.i18n?.web ?? WEB_DEFAULT_LANGUAGE;
  const hideDeprecatedVersions = config?.web?.hideDeprecatedVersions ?? false;
  const darkMode = config?.web?.darkMode ?? false;
  const title = config?.web?.title ?? WEB_TITLE;
  const login = hasLogin(config);
  const scope = config?.web?.scope ?? '';
  const favicon = resolveLogo(config?.web?.favicon, base);
  const logo = resolveLogo(config?.web?.logo, base);
  const logoDark = resolveLogo(config?.web?.logoDark, base);
  const pkgManagers = config?.web?.pkgManagers ?? ['yarn', 'pnpm', 'npm'];
  const version = res.locals.app_version ?? '';
  const flags = {
    ...config.flags,
    // legacy from 5.x
    ...config.experiments,
  };
  const primaryColor =
    validatePrimaryColor(config?.web?.primary_color ?? config?.web?.primaryColor) ??
    WEB_PRIMARY_COLOR;
  const {
    showInfo,
    showSettings,
    showThemeSwitch,
    showFooter,
    showSearch,
    showDownloadTarball,
    showRaw,
    showUplinks,
  } = Object.assign({}, config?.web);

  return {
    showInfo,
    showSettings,
    showThemeSwitch,
    showFooter,
    showSearch,
    showDownloadTarball,
    showRaw,
    showUplinks,
    darkMode,
    url_prefix,
    basename,
    base,
    primaryColor,
    version,
    logo,
    logoDark,
    favicon,
    flags,
    login,
    pkgManagers,
    title,
    scope,
    language,
    hideDeprecatedVersions,
  };
}
