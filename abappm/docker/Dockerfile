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

# Custom translations (bundled into ui-theme via import.meta.glob at build time)
COPY abappm/docker /opt/verdaccio-docker
COPY abappm/conf /opt/verdaccio-conf
COPY abappm/plugins /opt/verdaccio-plugins
COPY abappm/i18n ./packages/plugins/ui-theme/src/i18n/download_translations

# Install dependencies, build, and deploy the verdaccio package
RUN npm install -g corepack && \
    corepack install && \
    pnpm config set registry $VERDACCIO_BUILD_REGISTRY && \
    pnpm install --frozen-lockfile --ignore-scripts && \
    pnpm run build && \
    pnpm --filter verdaccio --prod --legacy deploy /opt/verdaccio-deploy

# Install pro plugins in the builder (reuses the warm pnpm store from above)
RUN npm pack /opt/verdaccio-plugins/@verdaccio-pro/database && \
    cd /opt/verdaccio-plugins && \
    pnpm install --prod --no-optional --ignore-scripts

# Strip dev-only files before copying into the runtime image
RUN sh /opt/verdaccio-docker/cleanup.sh

#
# --- Production Stage ---
#
FROM node:24-alpine AS app

ARG BUILD_SHA
ARG BUILD_DATE

LABEL maintainer="https://github.com/abapPM" \
      dockerfile="Dockerfile-apm" \
      build_sha=$BUILD_SHA \
      build_date=$BUILD_DATE

ENV NODE_ENV=production \
    VERDACCIO_APP_DIR=/opt/verdaccio \
    VERDACCIO_BUILD_REGISTRY=https://registry.npmjs.org \
    VERDACCIO_USER_NAME=verdaccio \
    VERDACCIO_USER_UID=10001 \
    VERDACCIO_PORT=4873 \
    VERDACCIO_PROTOCOL=http \
    VERDACCIO_ADDRESS=0.0.0.0 \
    BUILD_SHA=$BUILD_SHA \
    BUILD_DATE=$BUILD_DATE
ENV PATH=$VERDACCIO_APP_DIR/docker-bin:$PATH \
    HOME=$VERDACCIO_APP_DIR

WORKDIR $VERDACCIO_APP_DIR

# dumb-init: minimal init system (https://github.com/Yelp/dumb-init)
# ncdu: disk usage analyzer (https://dev.yorhel.nl/ncdu)
RUN apk add --no-cache openssl dumb-init ncdu && \
    mkdir -p /verdaccio/storage /verdaccio/plugins /verdaccio/conf && \
    rm -rf /opt/yarn-v1.22.22

# Copy deployed Verdaccio, pre-installed plugins, helper scripts, and config
COPY --from=builder /opt/verdaccio-deploy ./
COPY --from=builder /opt/verdaccio-conf /verdaccio/conf
COPY --from=builder /opt/verdaccio-plugins /verdaccio/plugins
COPY docker-bin/ ./docker-bin/

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
