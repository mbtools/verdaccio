# SQL Storage Plugin for Verdaccio Pro

[![Verdaccio Pro Home](https://img.shields.io/badge/Homepage-Verdaccio%20Pro-405236?style=flat)](https://verdaccio.pro)
[![MIT License](https://img.shields.io/github/license/verdaccio-pro/verdaccio-pro?label=License&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro/blob/main/LICENSE)
[![Verdaccio Pro Latest](https://img.shields.io/npm/v/@verdaccio-pro/verdaccio-pro?label=Latest%20Version&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro)

[![Documentation](https://img.shields.io/badge/Documentation-Verdaccio%20Pro?style=flat&logo=Verdaccio&label=Verdaccio%20Pro&color=cd4000)](https://verdaccio.pro/docs)
[![Discord](https://img.shields.io/badge/Chat-Discord?style=flat&logo=Discord&label=Discord&color=cd4000)](https://discord.com/channels/388674437219745793)
[![Bluesky](https://img.shields.io/badge/Follow-Bluesky?style=flat&logo=Bluesky&label=Bluesky&color=cd4000)](https://bsky.app/profile/verdaccio.pro)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

## Description

The `@verdaccio-pro/sql-storage` package is a Verdaccio plugin that enables fast, reliable storage of npm packages and metadata in a PostgreSQL database. It is designed for scalability, data integrity, and easy integration with enterprise workflows.

## Features

- Supports PostgreSQL via Drizzel ORM
- Fast package publishing and retrieval
- Transactional operations for data consistency
- Flexible schema migrations
- Easy setup and configuration
- Optimized for performance and reliability

## Quickstart

Add the following to your Verdaccio configuration:

```yaml
store:
  '@verdaccio-pro/sql-storage':
    url: <your-database-url> # can also be set via DATABASE_URL environment variable
```
