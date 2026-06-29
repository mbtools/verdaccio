# Middleware Plugin for Verdaccio Pro

[![Verdaccio Pro Home](https://img.shields.io/badge/Homepage-Verdaccio%20Pro-405236?style=flat)](https://verdaccio.pro)
[![MIT License](https://img.shields.io/github/license/verdaccio-pro/verdaccio-pro?label=License&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro/blob/main/LICENSE)
[![Verdaccio Pro Latest](https://img.shields.io/npm/v/@verdaccio-pro/verdaccio-pro?label=Latest%20Version&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro)

[![Documentation](https://img.shields.io/badge/Documentation-Verdaccio%20Pro?style=flat&logo=Verdaccio&label=Verdaccio%20Pro&color=cd4000)](https://verdaccio.pro/docs)
[![Discord](https://img.shields.io/badge/Chat-Discord?style=flat&logo=Discord&label=Discord&color=cd4000)](https://discord.com/channels/388674437219745793)
[![Bluesky](https://img.shields.io/badge/Follow-Bluesky?style=flat&logo=Bluesky&label=Bluesky&color=cd4000)](https://bsky.app/profile/verdaccio.pro)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

## Description

The `@verdaccio-pro/middleware` package is a plugin for Verdaccio that enhances security and user experience by providing a set of Express middlewares. It is designed for easy integration and robust protection for your private npm registry.

NO WARRANTIES, [Functional Source License](https://fsl.software), [MIT Future License](LICENSE)

## Features

### Security Headers

Sets security headers and configurable CORS on all responses (Strict-Transport-Security, Content-Security-Policy, Permissions-Policy, Referrer-Policy, X-Robots-Tag, X-Powered-By). Use `corsAllowedOrigins` to allow credentialed CORS for specific origins; all other cross-origin requests receive public wildcard CORS.

### Prototype Pollution Protection

Rejects JSON bodies containing `__proto__`, `constructor`, or `prototype` keys.

### Profanity Filter

Rejects write requests whose JSON body contains profanity.

### Blacklist Filter

Rejects write requests whose JSON body links to blocked adult domains.

### Event Log

Records package and user activity events to storage.

### HTTP Log

Writes each HTTP request to a timestamped file under `http-logs/`. Off by default; set `httpLog: true` to enable.

### Block Unwanted Requests

Returns 404 for requests probing common non-registry file extensions (e.g., `.php`, `.exe`, `.cmd`, `.ps1`, `.txt`, `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`, `.ppt`, `.pptx`) to reduce attack surface and bot noise.

### NPM-style URL Redirect

Redirects `/package/*` URLs to the web UI detail page (e.g., `/package/@scope/pkg` → `/-/web/detail/@scope/pkg`).

### User-Agent Filter

When set, rejects requests whose `User-Agent` header does not match the given RegExp source.

## Quickstart

Add the following to your Verdaccio configuration:

```yaml
middleware:
  '@verdaccio-pro/middleware':
    enabled: true
```

## Configuration

Boolean options are enabled by default when omitted; set to `false` to disable. `httpLog` is off unless set to `true`. `userAgent` is only applied when set.

```yaml
middleware:
  '@verdaccio-pro/middleware':
    enabled: true
    # Rejects JSON bodies containing __proto__, constructor, or prototype keys.
    prototypePollutionProtection: true
    # Rejects write requests whose JSON body contains profanity.
    profanityFilter: true
    # Rejects write requests whose JSON body links to blocked adult domains.
    blacklistFilter: true
    # Records package and user activity events to storage.
    eventLog: true
    # Writes each HTTP request to a timestamped file under http-logs/.
    httpLog: false
    # Sets security headers and configurable CORS on all responses.
    securityHeaders: true
    # Origins allowed credentialed CORS; all other cross-origin requests receive public wildcard CORS.
    corsAllowedOrigins:
      - https://app.example.com
    # Returns 404 for requests probing common non-registry file extensions.
    blockUnwantedRequests: true
    # Redirects /package/* URLs to the web UI detail page.
    redirectNpmStyleUrl: true
    # RegExp source; requests whose User-Agent header does not match are rejected.
    userAgent: '^npm/'
```

## About

Made with ❤ in Canada

Copyright 2025 apm.to Inc. <https://apm.to>

Follow [@marcf.be](https://bsky.app/profile/marcf.be) on Bluesky and [@marcfbe](https://linkedin.com/in/marcfbe) or LinkedIn
