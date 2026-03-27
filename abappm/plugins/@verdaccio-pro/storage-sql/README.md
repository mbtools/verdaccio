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

NO WARRANTIES, [Functional Source License](https://fsl.software), [MIT Future License](LICENSE)

## Features

- Supports PostgreSQL via Drizzel ORM
- Fast package publishing and retrieval
- Transactional operations for data consistency
- Flexible schema migrations
- Easy setup and configuration
- Optimized for performance and reliability

## Quickstart

### 1. Run Database Migrations

Before using the plugin, run the migrations to create required database tables:

```bash
nx db:migrate storage-sql
```

### 2. Configure Verdaccio

Add the following to your Verdaccio configuration:

```yaml
store:
  '@verdaccio-pro/sql-storage':
    url: <your-database-url> # can also be set via DATABASE_URL environment variable
```

### 3. Environment Variables

To customize the database connection, you can set the following environment variables:

| Variable                     | Default    | Description                                                                |
| ---------------------------- | ---------- | -------------------------------------------------------------------------- |
| `DATABASE_URL`               | _required_ | PostgreSQL connection string (e.g., `postgresql://user:pass@host:5432/db`) |
| `DATABASE_SECRET`            | _required_ | Secret key for encryption                                                  |
| `DB_SSL`                     | `true`     | Enable SSL connection to database                                          |
| `DB_SSL_REJECT_UNAUTHORIZED` | `true`     | Reject self-signed SSL certificates (set to `false` for development)       |
| `DB_POOL_SIZE`               | `22`       | Database connection pool size                                              |
| `DB_LOGGING`                 | `false`    | Enable SQL query logging                                                   |

**Example for development (local database without SSL):**

```bash
DB_SSL=false
```

**Example for production with self-signed certificate:**

```bash
DB_SSL=true
DB_SSL_REJECT_UNAUTHORIZED=false
```

## About

Made with ❤ in Canada

Copyright 2025 apm.to Inc. <https://apm.to>

Follow [@marcf.be](https://bsky.app/profile/marcf.be) on Blueksy and [@marcfbe](https://linkedin.com/in/marcfbe) or LinkedIn
