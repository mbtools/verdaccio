# Auth Plugin for Verdaccio Pro

[![Verdaccio Pro Home](https://img.shields.io/badge/Homepage-Verdaccio%20Pro-405236?style=flat)](https://verdaccio.pro)
[![MIT License](https://img.shields.io/github/license/verdaccio-pro/verdaccio-pro?label=License&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro/blob/main/LICENSE)
[![Verdaccio Pro Latest](https://img.shields.io/npm/v/@verdaccio-pro/verdaccio-pro?label=Latest%20Version&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro)

[![Documentation](https://img.shields.io/badge/Documentation-Verdaccio%20Pro?style=flat&logo=Verdaccio&label=Verdaccio%20Pro&color=cd4000)](https://verdaccio.pro/docs)
[![Discord](https://img.shields.io/badge/Chat-Discord?style=flat&logo=Discord&label=Discord&color=cd4000)](https://discord.com/channels/388674437219745793)
[![Bluesky](https://img.shields.io/badge/Follow-Bluesky?style=flat&logo=Bluesky&label=Bluesky&color=cd4000)](https://bsky.app/profile/verdaccio.pro)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

## Description

The `@verdaccio-pro/auth` package is a secure authentication plugin for Verdaccio, providing user management and password handling with database-backed storage and encryption. It is designed for modern Verdaccio deployments requiring robust, scalable, and secure authentication.

## Features

- **User Authentication**: Secure login with bcrypt password hashing.
- **User Management**: Add, remove, and update users and passwords.
- **Email Support**: Store and update user emails (for future features).
- **Database Storage**: Uses SQL database for storing user credentials.
- **Password Encryption**: All sensitive data is encrypted at rest.
- **Configurable Security**: Adjustable bcrypt rounds, user limits, and slow verification warnings.
- **Verdaccio Integration**: Seamless integration with Verdaccio plugin system.
- **Access Control**: Simple allow-all access/publish/unpublish hooks (customize as needed).

## Quickstart

Add the following to your Verdaccio configuration:

```yaml
auth:
  '@verdaccio-pro/auth':
    enabled: true
    url: <your-database-url> # can also be set via DATABASE_URL environment variable
    rounds: 10 # bcrypt rounds (default: 10)
    max_users: 1000 # maximum allowed users (default: Infinity)
    slow_verify_ms: 300 # log warning if password check is slow (ms)
```
