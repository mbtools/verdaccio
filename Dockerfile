# --- Build Stage ---
FROM --platform=${BUILDPLATFORM:-linux/amd64} node:24-alpine AS builder

ENV NODE_ENV=production \
    PNPM_VERSION=10.5.2 \
    VERDACCIO_BUILD_REGISTRY=https://registry.npmjs.org \
    VERDACCIO_BUILD_FOLDER=/opt/verdaccio-build

RUN apk add --force-overwrite && \
    apk --no-cache add openssl ca-certificates wget && \
    apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python3 && \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk && \
    apk add --force-overwrite glibc-2.35-r0.apk

WORKDIR $VERDACCIO_BUILD_FOLDER

RUN corepack enable && corepack prepare pnpm@$PNPM_VERSION --activate

# Copy only package manager files to benefit from Docker cache (unfortunately, copy is not recursive)
COPY pnpm-lock.yaml ./ 
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY packages/*/package.json ./packages/*/
COPY packages/core/*/package.json ./packages/core/*/
COPY packages/logger/*/package.json ./packages/logger/*/
COPY packages/plugins/audit/package.json ./packages/plugins/audit/
COPY packages/plugins/htpasswd/package.json ./packages/plugins/htpasswd/
COPY packages/plugins/local-storage/package.json ./packages/plugins/local-storage/
COPY packages/plugins/ui-theme/package.json ./packages/plugins/ui-theme/
COPY packages/server/express/package.json ./packages/server/express/

# Install all dependencies (no hoist, workspace-aware)
RUN pnpm config set registry $VERDACCIO_BUILD_REGISTRY && \
    pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY packages/ ./packages

# Build the repo
RUN pnpm run build

# --- Plugin Stage ---
FROM --platform=${BUILDPLATFORM:-linux/amd64} node:24-alpine AS plugins

ENV VERDACCIO_PLUGINS_FOLDER=/opt/verdaccio-plugins

WORKDIR $VERDACCIO_PLUGINS_FOLDER

COPY abappm/plugins/ ./

RUN cd $VERDACCIO_PLUGINS_FOLDER/@verdaccio-pro/auth && npm install --production && \
    cd $VERDACCIO_PLUGINS_FOLDER/@verdaccio-pro/filter && npm install --production && \
    cd $VERDACCIO_PLUGINS_FOLDER/@verdaccio-pro/metrics && npm install --production && \
    cd $VERDACCIO_PLUGINS_FOLDER/@verdaccio-pro/storage-proxy && npm install --production && \
    cd $VERDACCIO_PLUGINS_FOLDER/@verdaccio-pro/storage-sql && npm install --production

# --- Production Stage ---
FROM node:24-alpine
LABEL maintainer="https://github.com/abapPM/abapPM"

ENV VERDACCIO_APPDIR=/opt/verdaccio \
    VERDACCIO_USER_NAME=verdaccio \
    VERDACCIO_USER_UID=10001 \
    VERDACCIO_PORT=4873 \
    VERDACCIO_PROTOCOL=http
ENV PATH=$VERDACCIO_APPDIR/docker-bin:$PATH \
    HOME=$VERDACCIO_APPDIR

WORKDIR $VERDACCIO_APPDIR

RUN corepack enable && corepack prepare pnpm@$PNPM_VERSION --activate

# Copy only package manager files to benefit from Docker cache (unfortunately, copy is not recursive)
COPY pnpm-lock.yaml ./ 
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY packages/*/package.json ./packages/*/
COPY packages/core/*/package.json ./packages/core/*/
COPY packages/logger/*/package.json ./packages/logger/*/
COPY packages/plugins/*/package.json ./packages/plugins/*/
COPY packages/server/express/package.json ./packages/server/express/

# Only install production dependencies (omit devDependencies)
RUN pnpm config set registry $VERDACCIO_BUILD_REGISTRY && \
    pnpm install --frozen-lockfile --prod --no-optional --ignore-scripts

# Clean up
RUN rm $VERDACCIO_BUILD_FOLDER/pnpm-lock.yaml $VERDACCIO_BUILD_FOLDER/pnpm-workspace.yaml

# Copy build artifacts
COPY --from=builder $VERDACCIO_BUILD_FOLDER/package.json ./
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/*/package.json ./packages/*/
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/core/*/package.json ./packages/core/*/
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/logger/*/package.json ./packages/logger/*/
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/plugins/*/package.json ./packages/plugins/*/
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/server/express/package.json ./packages/server/express/

COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/*/build ./packages/*/build
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/core/*/build ./packages/core/*/build
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/logger/*/build ./packages/logger/*/build
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/plugins/*/build ./packages/plugins/*/build
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/server/express/build ./packages/server/express/build

COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/cli/bin ./packages/cli/bin
COPY --from=builder $VERDACCIO_BUILD_FOLDER/packages/verdaccio/bin ./packages/verdaccio/bin

# https://github.com/Yelp/dumb-init
RUN apk --no-cache add openssl dumb-init

RUN mkdir -p /verdaccio/storage /verdaccio/plugins /verdaccio/conf

# apm
COPY --from=plugins $VERDACCIO_PLUGINS_FOLDER /verdaccio/plugins
ADD abappm/conf /verdaccio/conf
ADD abappm/i18n $VERDACCIO_APPDIR/packages/config/i18n/build/downloaded_translations

RUN adduser -u $VERDACCIO_USER_UID -S -D -h $VERDACCIO_APPDIR -g "$VERDACCIO_USER_NAME user" -s /sbin/nologin $VERDACCIO_USER_NAME && \
    chmod -R +x $VERDACCIO_APPDIR/packages/verdaccio/bin $VERDACCIO_APPDIR/docker-bin && \
    chown -R $VERDACCIO_USER_UID:root /verdaccio/storage /verdaccio/plugins /verdaccio/conf && \
    chmod -R g=u /verdaccio/storage /verdaccio/plugins /verdaccio/conf /etc/passwd

USER $VERDACCIO_USER_UID

EXPOSE $VERDACCIO_PORT

VOLUME /verdaccio/storage

ENTRYPOINT ["uid_entrypoint"]

CMD $VERDACCIO_APPDIR/packages/verdaccio/bin/verdaccio --config /verdaccio/conf/config.yaml --listen $VERDACCIO_PROTOCOL://0.0.0.0:$VERDACCIO_PORT
