# Filter Plugin for Verdaccio Pro

[![Verdaccio Pro Home](https://img.shields.io/badge/Homepage-Verdaccio%20Pro-405236?style=flat)](https://verdaccio.pro)
[![MIT License](https://img.shields.io/github/license/verdaccio-pro/verdaccio-pro?label=License&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro/blob/main/LICENSE)
[![Verdaccio Pro Latest](https://img.shields.io/npm/v/@verdaccio-pro/verdaccio-pro?label=Latest%20Version&color=405236)](https://github.com/verdaccio-pro/verdaccio-pro)

[![Documentation](https://img.shields.io/badge/Documentation-Verdaccio%20Pro?style=flat&logo=Verdaccio&label=Verdaccio%20Pro&color=cd4000)](https://verdaccio.pro/docs)
[![Discord](https://img.shields.io/badge/Chat-Discord?style=flat&logo=Discord&label=Discord&color=cd4000)](https://discord.com/channels/388674437219745793)
[![Bluesky](https://img.shields.io/badge/Follow-Bluesky?style=flat&logo=Bluesky&label=Bluesky&color=cd4000)](https://bsky.app/profile/verdaccio.pro)

[![StandWithUkraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/badges/StandWithUkraine.svg)](https://github.com/vshymanskyy/StandWithUkraine/blob/main/docs/README.md)

## Description

The `@verdaccio-pro/filter` package is a Verdaccio plugin that allows filtering out packages, typically for security purposes.

NO WARRANTIES, [MIT License](LICENSE)

## Features

You can define a blacklist based on scope, package name, and or version which will suppress packages from being visible to any client accessing Verdaccio.

## Quickstart

Add the following to your Verdaccio configuration:

```yaml
filter:
  '@verdaccio-pro/filter':
    enabled: true
    block:
      # block all packages in a scope
      - scope: @evil
      # block a malicious package
      - package: semvver
      # block some malicious versions of previously ok package
      - package: @coolauthor/stolen
        versions: '>2.0.1'
      # block some malicious versions of previously ok package, replacing them with older, correct versions
      # use when package is used in transient dependencies and 'block' breaks the installs
      - package: @coolauthor/stolen
        versions: '>2.0.1'
        strategy: replace
```

Version ranges use the [npm semver](https://www.npmjs.com/package/semver) syntax (same as in `package.json`).

## Attribution

This plugin is a port of the following open-source project to the latest Verdaccio version. Please support them if you can!

- [Verdaccio Plugin Secfilter](https://github.com/Ansile/verdaccio-plugin-secfilter), Ansile <ansilet@yandex.ru>, [MIT]

## About

Made with ❤ in Canada

Copyright 2025 apm.to Inc. <https://apm.to>

Follow [@marcf.be](https://bsky.app/profile/marcf.be) on Blueksy and [@marcfbe](https://linkedin.com/in/marcfbe) or LinkedIn
