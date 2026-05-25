#
# --- Build Stage ---
#
FROM --platform=${BUILDPLATFORM:-linux/amd64} node:24-alpine AS builder

ENV NODE_ENV=production \
    VERDACCIO_BUILD_REGISTRY=https://registry.npmjs.org \
    VERDACCIO_BUILD_DIR=/opt/verdaccio-build

RUN apk add --no-cache ca-certificates g++ gcc libgcc libstdc++ linux-headers make python3

WORKDIR $VERDACCIO_BUILD_DIR

# Copy only files needed for install/build (better Docker cache usage)
COPY pnpm-lock.yaml pnpm-workspace.yaml tsconfig.base.json tsconfig.reference.json vite.lib.config.mjs package.json ./
COPY packages/ ./packages/

# Install dependencies, build, and deploy the verdaccio package
RUN npm -g i corepack && \
    corepack install && \
    pnpm config set registry $VERDACCIO_BUILD_REGISTRY && \
    pnpm install --frozen-lockfile --ignore-scripts && \
    pnpm run build && \
    pnpm --filter verdaccio --prod --legacy deploy /opt/verdaccio-deploy

#
# --- Production Stage ---
#
FROM node:24-alpine AS app
LABEL maintainer="https://github.com/abapPM" \
      dockerfile="Dockerfile-apm"

ENV NODE_ENV=production \
    VERDACCIO_APP_DIR=/opt/verdaccio \
    VERDACCIO_BUILD_REGISTRY=https://registry.npmjs.org \
    VERDACCIO_USER_NAME=verdaccio \
    VERDACCIO_USER_UID=10001 \
    VERDACCIO_PORT=4873 \
    VERDACCIO_PROTOCOL=http \
    VERDACCIO_ADDRESS=0.0.0.0
ENV PATH=$VERDACCIO_APP_DIR/docker-bin:$PATH \
    HOME=$VERDACCIO_APP_DIR

WORKDIR $VERDACCIO_APP_DIR

# dumb-init: minimal init system (https://github.com/Yelp/dumb-init)
# ncdu: disk usage analyzer (https://dev.yorhel.nl/ncdu)
RUN apk add --no-cache openssl dumb-init ncdu && \
    mkdir -p /verdaccio/storage /verdaccio/plugins /verdaccio/conf

# Copy deployed Verdaccio, helper scripts, plugins, config, and translations
COPY --from=builder /opt/verdaccio-deploy ./
COPY docker-bin/ ./docker-bin/
COPY abappm/plugins /verdaccio/plugins
COPY abappm/conf /verdaccio/conf
COPY abappm/i18n $VERDACCIO_APP_DIR/packages/core/i18n/build/download_translations

# Install apm plugins
RUN npm -g i corepack && \
    corepack install && \
    pnpm config set registry $VERDACCIO_BUILD_REGISTRY

RUN cd /verdaccio/plugins/@verdaccio-pro/auth && \
    pnpm install --prod --no-optional --ignore-scripts
RUN cd /verdaccio/plugins/@verdaccio-pro/filter && \
    pnpm install --prod --no-optional --ignore-scripts
RUN cd /verdaccio/plugins/@verdaccio-pro/middleware && \
    pnpm install --prod --no-optional --ignore-scripts
RUN cd /verdaccio/plugins/@verdaccio-pro/storage-proxy && \
    pnpm install --prod --no-optional --ignore-scripts
RUN cd /verdaccio/plugins/@verdaccio-pro/storage-sql && \
    pnpm install --prod --no-optional --ignore-scripts

# Clean up build artifacts and dev-only files
RUN rm -f ./pnpm-lock.yaml ./pnpm-workspace.yaml && \
    rm -rf ./.cache /opt/yarn-v1.22.22 ./packages/tools/helpers ./packages/tools/local-publish ./packages/tools/verdaccio-prefix-fake-plugin && \
    find . -type f \( -name ".*" -o -name "*.md" -o -name "LICENSE" -o -name "tsconfig.*" -o -name "vitest.*" -o -name "*.d.ts" -o -name "*.js.map" -o -name "typedoc.*" -o -name "webpack.*" \) -delete && \
    find . -type d \( -name "examples" -o -name "src" -o -name "test" -o -name "tests" -o -name "tools" -o -name "types" -o -name "vitest" -o -name "__partials__" -o -name "__snapshots__" \) -not -path "*/node_modules/*" -exec rm -rf {} +

# Set user, permissions, ownership
RUN adduser -u $VERDACCIO_USER_UID -S -D -h $VERDACCIO_APP_DIR -g "$VERDACCIO_USER_NAME user" -s /sbin/nologin $VERDACCIO_USER_NAME && \
    chmod -R +x $VERDACCIO_APP_DIR/bin $VERDACCIO_APP_DIR/docker-bin && \
    chown -R $VERDACCIO_USER_UID:root /verdaccio/storage /verdaccio/plugins /verdaccio/conf && \
    chmod -R g=u /verdaccio/storage /verdaccio/plugins /verdaccio/conf /etc/passwd

USER $VERDACCIO_USER_UID

EXPOSE $VERDACCIO_PORT

VOLUME /verdaccio/storage

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:$VERDACCIO_PORT/-/ping || exit 1

ENTRYPOINT ["uid_entrypoint"]

CMD ["/bin/sh", "-c", "$VERDACCIO_APP_DIR/bin/verdaccio --config /verdaccio/conf/config.yaml --listen $VERDACCIO_PROTOCOL://$VERDACCIO_ADDRESS:$VERDACCIO_PORT"]
