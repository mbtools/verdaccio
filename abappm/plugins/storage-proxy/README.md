# Storage Proxy Plugin for Verdaccio Pro

[![Verdaccio Pro Home](https://img.shields.io/badge/Homepage-Verdaccio%20Pro-405236?style=flat)](https://verdaccio.pro)
[![MIT License](https://img.shields.io/github/license/verdaccio-pro/verdaccio-pro?label=License&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro/blob/main/LICENSE)
[![Verdaccio Pro Latest](https://img.shields.io/npm/v/@verdaccio-pro/verdaccio-pro?label=Latest%20Version&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro)

[![Documentation](https://img.shields.io/badge/Documentation-Verdaccio%20Pro?style=flat&logo=Verdaccio&label=Verdaccio%20Pro&color=cd4000)](https://verdaccio.pro/docs)
[![Discord](https://img.shields.io/badge/Chat-Discord?style=flat&logo=Discord&label=Discord&color=cd4000)](https://discord.com/channels/388674437219745793)
[![Bluesky](https://img.shields.io/badge/Follow-Bluesky?style=flat&logo=Bluesky&label=Bluesky&color=cd4000)](https://bsky.app/profile/verdaccio.pro)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

## Description

The `@verdaccio-pro/storage-proxy` package is a Verdaccio plugin that decouples database, search, packument, and tarball accesses.

For example, you can use `aws-s3-storage` for tarball accesses, and then a SQL database for the other data types to create a robust mixed storage for a cluster environment.

Access types:

- Database: accesses related to package CRD, security, and token.
- Search: accesses related to search.
- Packument: accesses related to packument CRUD.
- Tarball: accesses related to tarball read and write.

## Quickstart

```yaml
store:
  '@verdaccio-pro/storage-proxy':
    database_backend: '@verdaccio-pro/storage-sql'
    search_backend: '@verdaccio-pro/storage-sql'
    packument_backend: '@verdaccio-pro/storage-sql'
    tarball_backend: aws-s3-storage
    backends:
      aws-s3-storage:
        bucket: verdaccio
        ...
      '@verdaccio-pro/storage-sql'
        url: <database_url>
        ...
```
