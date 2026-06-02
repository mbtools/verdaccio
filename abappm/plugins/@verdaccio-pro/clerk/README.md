# Clerk Auth Plugin for Verdaccio Pro

[![Verdaccio Pro Home](https://img.shields.io/badge/Homepage-Verdaccio%20Pro-405236?style=flat)](https://verdaccio.pro)
[![MIT License](https://img.shields.io/github/license/verdaccio-pro/verdaccio-pro?label=License&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro/blob/main/LICENSE)
[![Verdaccio Pro Latest](https://img.shields.io/npm/v/@verdaccio-pro/verdaccio-pro?label=Latest%20Version&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro)

[![Documentation](https://img.shields.io/badge/Documentation-Verdaccio%20Pro?style=flat&logo=Verdaccio&label=Verdaccio%20Pro&color=cd4000)](https://verdaccio.pro/docs)
[![Discord](https://img.shields.io/badge/Chat-Discord?style=flat&logo=Discord&label=Discord&color=cd4000)](https://discord.com/channels/388674437219745793)
[![Bluesky](https://img.shields.io/badge/Follow-Bluesky?style=flat&logo=Bluesky&label=Bluesky&color=cd4000)](https://bsky.app/profile/verdaccio.pro)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

## Description

The `@verdaccio-pro/auth-clerk` package is a secure authentication plugin for Verdaccio, providing user management and password handling integrated with [Clerk](https://clerk.com). It is designed for modern Verdaccio deployments requiring robust, scalable, and secure authentication.

NO WARRANTIES, [Functional Source License](https://fsl.software), [MIT Future License](LICENSE)

## Features

- **User Authentication**: Secure login via Clerk API.
- **User Management**: Add, remove, and update users and passwords.
- **Email Support**: Store and update user emails (for future features).
- **Password Encryption**: All sensitive data is encrypted at rest.
- **Verdaccio Integration**: Seamless integration with Verdaccio plugin system.
- **Access Control**: Support public, private, and scoped package access/publish/unpublish hooks (customize as needed).

## Quickstart

### 1. Configure Verdaccio

Add the following to your Verdaccio configuration:

```yaml
auth:
  '@verdaccio-pro/clerk':
    enabled: true
    clerk_secret_key: # can also be set via CLERK_SECRET_KEY environment variable
```

### 2. Environment Variables

To customize the database connection, follow the instructions for the [SQL Storage Plugin](../storage-sql/README.md).

## About

Made with ❤ in Canada

Copyright 2025 apm.to Inc. <https://apm.to>

Follow [@marcf.be](https://bsky.app/profile/marcf.be) on Bluesky and [@marcfbe](https://linkedin.com/in/marcfbe) or LinkedIn
