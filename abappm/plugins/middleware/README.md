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

## Features

### Security Headers

Automatically sets HTTP security headers (Strict-Transport-Security, Content-Security-Policy, Permissions-Policy, Referrer-Policy, X-Robots-Tag, X-Powered-By) on all responses to improve security and privacy.

### Block Unwanted Requests

Blocks requests for common unwanted file extensions (e.g., `.php`, `.exe`, `.cmd`, `.ps1`, `.txt`, `.pdf`, `.doc`, `.docx`, `.xls`, `.xlsx`, `.ppt`, `.pptx`) to reduce attack surface and bot noise.

### NPM-style URL Redirect

Redirects NPM-style package URLs (e.g., `/package/@scope/pkg`) to the Verdaccio web UI for a better user experience.

## Quickstart

Add the following to your Verdaccio configuration:

```yaml
middleware:
  '@verdaccio-pro/middleware':
    enabled: true
```
