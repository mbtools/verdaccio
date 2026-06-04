#!/bin/sh

# Strip dev-only files
set -eu

#
# Verdaccio Deploy
#
cd /opt/verdaccio-deploy

rm -f ./pnpm-lock.yaml ./pnpm-workspace.yaml
rm -rf ./.cache ./packages/tools/helpers ./packages/tools/local-publish ./packages/tools/verdaccio-prefix-fake-plugin

find . -type f \
  \( -name ".*" \
    -o -name "*.markdown" \
    -o -name "*.md" \
    -o -name "LICENSE" \
    -o -name "tsconfig.*" \
    -o -name "typedoc.*" \
    -o -name "vitest.*" \
    -o -name "*.amd.js" \
    -o -name "*.amd.min.js" \
    -o -name "*.d.ts" \
    -o -name "*.js.map" \
    -o -name "*.mjs.map" \
  \) -delete

find . -type d \
  \( -name "examples" \
    -o -name "src" \
    -o -name "test" \
    -o -name "tests" \
    -o -name "tools" \
    -o -name "types" \
    -o -name "vitest" \
    -o -name "__partials__" \
    -o -name "__snapshots__" \
    -o -name "amd" \) \
  -not -path "*/node_modules/*" \
  -exec rm -rf {} +

#
# Verdaccio Plugins
#
cd /opt/verdaccio-plugins

rm -f ./pnpm-lock.yaml ./pnpm-workspace.yaml

find . -type f \( -name ".*" \
    -o -name "*.md" \
    -o -name "LICENSE" \
    -o -name "*.d.ts" \
    -o -name "*.js.map" \
    -o -name "*.mjs.map" \
    -o -name "*.tgz" \
  \) -delete
