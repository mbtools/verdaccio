# Link check report

Source: `C:\GitHub\verdaccio\verdaccio\scripts\links-extracted.json`
Checked: 2026-06-18 10:50:42

**Summary:** 259 ok, 78 failed (of 337)

**URL column:** Long URLs are shown with middle ellipsis (max 64 chars). Checks use the full URL.

_HTTP 200 (OK) rows omitted; pass `-IncludeOk` to list them._

| Status | HTTP | URL                                                              | Note                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------ | ---- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FAIL   | 0    | http://localhost                                                 | HEAD: No connection could be made because the target machine actively refused it. (localhost:80); GET: No connection could be made because the target machine actively refused it. (localhost:80)                                                                                                                                                                                                                                             |
| FAIL   | 0    | http://localhost:4873                                            | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/                                           | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/-/ping                                     | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/-/static/ui-options.js                     | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/-/user/org.couchdb.user:test               | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/@scope%2ftest1                             | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/custom-name?write=true                     | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/custom-n....3.tgz/-rev/16-e11c8db282b2d992 | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/custom-name/-rev/14-5d500cfce92f90fd       | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/lodash                                     | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/package-name?write=true                    | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:4873/package-name/-rev/18-d8ebe3020bd4ac9c      | HEAD: No connection could be made because the target machine actively refused it. (localhost:4873); GET: No connection could be made because the target machine actively refused it. (localhost:4873)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:5555                                            | HEAD: No connection could be made because the target machine actively refused it. (localhost:5555); GET: No connection could be made because the target machine actively refused it. (localhost:5555)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:8000                                            | HEAD: No connection could be made because the target machine actively refused it. (localhost:8000); GET: No connection could be made because the target machine actively refused it. (localhost:8000)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:8000/-/verdaccio/data/package/readme/jquery     | HEAD: No connection could be made because the target machine actively refused it. (localhost:8000); GET: No connection could be made because the target machine actively refused it. (localhost:8000)                                                                                                                                                                                                                                         |
| FAIL   | 0    | http://localhost:8080/bootstrap/-/bootstrap-4.3.1.tgz            | HEAD: No connection could be made because the target machine actively refused it. (localhost:8080); GET: No connection could be made because the target machine actively refused it. (localhost:8080)                                                                                                                                                                                                                                         |
| FAIL   | 404  | http://pierrecaserta.com/apach...one-docker-server-many-domains/ | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 0    | http://somedomain.org/                                           | HEAD: The requested name is valid, but no data of the requested type was found. (somedomain.org:80); GET: The requested name is valid, but no data of the requested type was found. (somedomain.org:80)                                                                                                                                                                                                                                       |
| FAIL   | 0    | http://something.local/                                          | HEAD: No such host is known. (something.local:80); GET: No such host is known. (something.local:80)                                                                                                                                                                                                                                                                                                                                           |
| FAIL   | 0    | http://verdaccio:4873/                                           | HEAD: No such host is known. (verdaccio:4873); GET: No such host is known. (verdaccio:4873)                                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 403  | http://www.w3.org/                                               | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | http://www.w3.org/1999/xlink                                     | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | http://www.w3.org/2000/svg                                       | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 404  | https://en.wikipedia.org/wiki/Crypt_(C                           | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 0    | https://example.org:4873                                         | HEAD: The request was canceled due to the configured HttpClient.Timeout of 30 seconds elapsing.; GET: The request was canceled due to the configured HttpClient.Timeout of 30 seconds elapsing.                                                                                                                                                                                                                                               |
| FAIL   | 0    | https://fake.verdaccio.org                                       | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/data/package/readme/*     | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/v...ccio/data/package/readme/jquery | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/v...o/data/package/readme/storybook | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/data/packages             | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/data/search/*             | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/data/sidebar/*            | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/data/sidebar/jquery       | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/data/sidebar/JSONStream   | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/data/sidebar/kleur        | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/data/sidebar/storybook    | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/-/verdaccio/sec/login                 | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/storybook/-/storybook-6.5.15.tgz      | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 0    | https://fake.verdaccio.org/verdaccio/-/verdaccio-2.7.1.tgz       | HEAD: No such host is known. (fake.verdaccio.org:443); GET: No such host is known. (fake.verdaccio.org:443)                                                                                                                                                                                                                                                                                                                                   |
| FAIL   | 404  | https://github.com/verdaccio-pro/verdaccio-pro.git               | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 404  | https://github.com/verdaccio-pro/verdaccio-pro/issues            | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 404  | https://github.com/verdaccio/contributing                        | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 404  | https://github.com/verdaccio/e2e-tests/tree/7.x                  | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 404  | https://github.com/verdaccio/ui/issues/119                       | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 404  | https://github.com/verdaccio/verdaccio/blob/5.x/CONTRIBUTING.md  | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 404  | https://github.com/verdaccio/v...ster/docs/migration-v5-to-v6.md | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 404  | https://github.com/verdaccio/verdaccio/tree/master/e2e/ui        | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 0    | https://localhost:443/                                           | HEAD: No connection could be made because the target machine actively refused it. (localhost:443); GET: No connection could be made because the target machine actively refused it. (localhost:443)                                                                                                                                                                                                                                           |
| FAIL   | 404  | https://mswjs.io/docs/recipes/mocking-error-responses            | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 0    | https://my.company.com/customJS.min.js                           | HEAD: No such host is known. (my.company.com:443); GET: No such host is known. (my.company.com:443)                                                                                                                                                                                                                                                                                                                                           |
| FAIL   | 0    | https://mycompany.com/npm                                        | HEAD: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. (mycompany.com:443); GET: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. (mycompany.com:443)           |
| FAIL   | 503  | https://registry.verdaccio.pro                                   | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 503  | https://registry.verdaccio.pro/                                  | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 0    | https://somedomain.org                                           | HEAD: The requested name is valid, but no data of the requested type was found. (somedomain.org:443); GET: The requested name is valid, but no data of the requested type was found. (somedomain.org:443)                                                                                                                                                                                                                                     |
| FAIL   | 0    | https://somedomain.org/                                          | HEAD: The requested name is valid, but no data of the requested type was found. (somedomain.org:443); GET: The requested name is valid, but no data of the requested type was found. (somedomain.org:443)                                                                                                                                                                                                                                     |
| FAIL   | 0    | https://somedomain.org/first_prefix                              | HEAD: The requested name is valid, but no data of the requested type was found. (somedomain.org:443); GET: The requested name is valid, but no data of the requested type was found. (somedomain.org:443)                                                                                                                                                                                                                                     |
| FAIL   | 0    | https://somedomain.org/my_prefix/                                | HEAD: The requested name is valid, but no data of the requested type was found. (somedomain.org:443); GET: The requested name is valid, but no data of the requested type was found. (somedomain.org:443)                                                                                                                                                                                                                                     |
| FAIL   | 0    | https://somedomain.org/second_prefix/                            | HEAD: The requested name is valid, but no data of the requested type was found. (somedomain.org:443); GET: The requested name is valid, but no data of the requested type was found. (somedomain.org:443)                                                                                                                                                                                                                                     |
| FAIL   | 0    | https://something.local/                                         | HEAD: No such host is known. (something.local:443); GET: No such host is known. (something.local:443)                                                                                                                                                                                                                                                                                                                                         |
| FAIL   | 0    | https://specifications.freedesktop.org/basedir-spec/latest/      | HEAD: Operation is not valid due to the current state of the object.; GET: Operation is not valid due to the current state of the object.                                                                                                                                                                                                                                                                                                     |
| FAIL   | 0    | https://unix:/tmp/http.sock                                      | HEAD: No such host is known. (unix:443); GET: No such host is known. (unix:443)                                                                                                                                                                                                                                                                                                                                                               |
| FAIL   | 0    | https://usagge.hipchat.com/v2/...cation?auth_token=mySecretToken | HEAD: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. (usagge.hipchat.com:443); GET: A connection attempt failed because the connected party did not properly respond after a period of time, or established connection failed because connected host has failed to respond. (usagge.hipchat.com:443) |
| FAIL   | 403  | https://verdaccio.nyc3.digital...g/publickey.verdaccio@pm.me.asc | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 404  | https://verdaccio.org/thanks.html                                | HEAD: Head returned error response; GET: Get returned error response                                                                                                                                                                                                                                                                                                                                                                          |
| FAIL   | 0    | https://verdaccio.pro                                            | HEAD: The requested name is valid, but no data of the requested type was found. (verdaccio.pro:443); GET: The requested name is valid, but no data of the requested type was found. (verdaccio.pro:443)                                                                                                                                                                                                                                       |
| FAIL   | 500  | https://www.i18next.com/overview/configuration-options           | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.ifrc.org/                                            | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/org/verdaccio                              | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/package/                                   | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/package/@verdaccio/ui-theme                | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/package/country-flag-icons                 | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/package/debug                              | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/package/express-rate-limit                 | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/package/hpagent                            | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/package/verdaccio                          | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.npmjs.com/search?q=sinopia                           | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FAIL   | 403  | https://www.savethechildren.org/us/where-we-work/ukraine/        | Head returned error response                                                                                                                                                                                                                                                                                                                                                                                                                  |

## Failed links - source files

- **http://localhost**

  - `.github\workflows\docker-proxy-apache-e2e.yml:38`
  - `.github\workflows\docker-proxy-apache-e2e.yml:40`
  - `.github\workflows\docker-proxy-apache-e2e.yml:42`
  - `.github\workflows\docker-proxy-apache-e2e.yml:44`
  - `.github\workflows\docker-proxy-nginx-e2e.yml:39`
  - `.github\workflows\docker-proxy-nginx-e2e.yml:41`
  - `.github\workflows\docker-proxy-nginx-e2e.yml:43`
  - `.github\workflows\docker-proxy-nginx-e2e.yml:45`

- **http://localhost:4873**

  - `.github\workflows\changesets-pr.yml:32`
  - `.github\workflows\ci.yml:103`
  - `.github\workflows\ci.yml:197`
  - `.github\workflows\ci.yml:251`
  - `.github\workflows\docker-build-test.yml:48`
  - `.github\workflows\smok-test-local-build.yml:116`
  - `.github\workflows\x-e2e-angular-cli-workflow.yml:25`
  - `.github\workflows\x-e2e-angular-cli-workflow.yml:29`
  - `.github\workflows\x-e2e-angular-cli-workflow.yml:62`
  - `.github\workflows\x-e2e-angular-cli-workflow.yml:66`
  - `.github\workflows\x-e2e-angular-cli-workflow.yml:98`
  - `.github\workflows\x-e2e-angular-cli-workflow.yml:102`
  - `.github\workflows\x-e2e-audit-workflow.yml:25`
  - `.github\workflows\x-e2e-audit-workflow.yml:30`
  - `.github\workflows\x-e2e-gatsbyjs-cli-workflow.yml:25`
  - `.github\workflows\x-e2e-gatsbyjs-cli-workflow.yml:29`
  - `.github\workflows\x-e2e-gatsbyjs-cli-workflow.yml:60`
  - `.github\workflows\x-e2e-gatsbyjs-cli-workflow.yml:64`
  - `.github\workflows\x-e2e-jest-workflow.yml:23`
  - `.github\workflows\x-e2e-jest-workflow.yml:28`
  - `.github\workflows\x-e2e-jest-workflow.yml:33`
  - `.github\workflows\x-e2e-jest-workflow.yml:54`
  - `.github\workflows\x-e2e-jest-workflow.yml:60`
  - `.github\workflows\x-e2e-jest-workflow.yml:90`
  - `.github\workflows\x-e2e-jest-workflow.yml:95`
  - `.github\workflows\x-e2e-jest-workflow.yml:100`
  - `.github\workflows\x-e2e-jest-workflow.yml:123`
  - `.github\workflows\x-e2e-jest-workflow.yml:128`
  - `.github\workflows\x-e2e-jest-workflow.yml:133`
  - `.github\workflows\x-e2e-jest-workflow.yml:156`
  - `.github\workflows\x-e2e-jest-workflow.yml:161`
  - `.github\workflows\x-e2e-jest-workflow.yml:166`
  - `.github\workflows\x-smok-test-docker.yml:27`
  - `.github\workflows\x-smok-test-docker.yml:29`
  - `.github\workflows\x-smok-test-docker.yml:31`
  - `.github\workflows\x-smok-test-docker.yml:33`
  - `.github\workflows\x-smok-test-module.yml:22`
  - `.github\workflows\x-smok-test-module.yml:32`
  - `.github\workflows\x-smok-test-module.yml:34`
  - `.github\workflows\x-smok-test-module.yml:41`
  - `.github\workflows\x-smok-test-module.yml:42`
  - `abappm\conf\config.yaml:186`
  - `CONTRIBUTING.md:178`
  - `cypress.config.ts:5`
  - `cypress\e2e\01-home.cy.ts:3`
  - `cypress\e2e\02-signin.cy.ts:3`
  - `cypress\e2e\03-layout.cy.ts:3`
  - `cypress\e2e\04-search.cy.ts:3`
  - `cypress\e2e\05-settings.cy.ts:3`
  - `cypress\e2e\06-publish.cy.ts:3`
  - `package.json:142`
  - `packages\config\src\conf\default.yaml:190`
  - `packages\config\src\conf\docker.yaml:186`
  - `scripts\e2e-cli-local.sh:15`

- **http://localhost:4873/**

  - `.github\workflows\smok-test-local-build.yml:62`
  - `docs\warnings.md:17`
  - `packages\config\src\address.ts:110`
  - `packages\config\src\address.ts:136`
  - `packages\core\core\src\warning-utils.ts:44`
  - `packages\plugins\ui-theme\index.html:11`
  - `packages\plugins\ui-theme\index.html:18`

- **http://localhost:4873/-/ping**

  - `.github\workflows\ci.yml:193`
  - `.github\workflows\ci.yml:240`
  - `.github\workflows\smok-test-local-build.yml:40`

- **http://localhost:4873/-/static/ui-options.js**

  - `.github\workflows\smok-test-local-build.yml:71`

- **http://localhost:4873/-/user/org.couchdb.user:test**

  - `.github\workflows\ci.yml:247`

- **http://localhost:4873/@scope%2ftest1**

  - `packages\api\src\publish.ts:34`

- **http://localhost:4873/custom-name?write=true**

  - `packages\api\src\publish.ts:66`
  - `packages\api\src\publish.ts:73`
  - `packages\api\src\publish.ts:77`

- **http://localhost:4873/custom-name/-/test1-1.0.3.tgz/-rev/16-e11c8db282b2d992**

  - `packages\api\src\publish.ts:67`
  - `packages\api\src\publish.ts:79`

- **http://localhost:4873/custom-name/-rev/14-5d500cfce92f90fd**

  - `packages\api\src\publish.ts:75`

- **http://localhost:4873/lodash**

  - `.github\workflows\smok-test-local-build.yml:127`

- **http://localhost:4873/package-name?write=true**

  - `packages\api\src\publish.ts:137`

- **http://localhost:4873/package-name/-rev/18-d8ebe3020bd4ac9c**

  - `packages\api\src\publish.ts:140`
  - `packages\api\src\publish.ts:174`

- **http://localhost:5555**

  - `packages\tools\helpers\src\addNewVersion.ts:9`
  - `packages\tools\helpers\src\generateLocalPackageMetadata.ts:8`
  - `packages\tools\helpers\src\generateRemotePackageMetadata.ts:8`

- **http://localhost:8000**

  - `CONTRIBUTING.md:134`
  - `packages\plugins\ui-theme\vite.config.mjs:61`

- **http://localhost:8000/-/verdaccio/data/package/readme/jquery**

  - `packages\ui-components\src\store\routes.ts:2`
  - `packages\ui-components\src\utils\routes.ts:19`

- **http://localhost:8080/bootstrap/-/bootstrap-4.3.1.tgz**

  - `packages\ui-components\src\components\Install\Install.stories.tsx:23`

- **http://pierrecaserta.com/apache-proxy-one-docker-server-many-domains/**

  - `e2e\docker\apache-verdaccio\apache_proxy\Dockerfile:3`

- **http://somedomain.org/**

  - `packages\config\src\conf\default.yaml:66`
  - `packages\config\src\conf\docker.yaml:66`

- **http://something.local/**

  - `abappm\conf\config.yaml:200`
  - `packages\config\src\conf\default.yaml:204`
  - `packages\config\src\conf\docker.yaml:200`

- **http://verdaccio:4873/**

  - `e2e\docker\apache-verdaccio\apache_proxy\conf\000-default.conf:13`
  - `e2e\docker\apache-verdaccio\apache_proxy\conf\000-default.conf:14`
  - `e2e\docker\proxy-nginx\nginx\verdaccio.conf:6`

- **http://www.w3.org/**

  - `packages\web\src\author-utils.ts:9`

- **http://www.w3.org/1999/xlink**

  - `packages\web\src\author-utils.ts:10`

- **http://www.w3.org/2000/svg**

  - `packages\ui-components\src\components\Readme\github-markdown.css:205`
  - `packages\ui-components\src\components\Readme\github-markdown.css:206`

- **https://en.wikipedia.org/wiki/Crypt_(C**

  - `packages\plugins\htpasswd\src\crypt3.ts:48`

- **https://example.org:4873**

  - `abappm\conf\config.yaml:188`
  - `packages\config\src\conf\default.yaml:192`
  - `packages\config\src\conf\docker.yaml:188`

- **https://fake.verdaccio.org**

  - `packages\ui-components\.storybook\preview-head.html:10`
  - `packages\ui-components\src\utils\__partials__\packageMeta.ts:200`

- **https://fake.verdaccio.org/-/verdaccio/data/package/readme/***

  - `packages\ui-components\src\components\AppRoute\AppRoute.stories.tsx:90`

- **https://fake.verdaccio.org/-/verdaccio/data/package/readme/jquery**

  - `packages\ui-components\src\AppTest\App.stories.tsx:53`
  - `packages\ui-components\src\layouts\Version\Version.stories.tsx:78`
  - `packages\ui-components\src\sections\Detail\Detail.stories.tsx:60`

- **https://fake.verdaccio.org/-/verdaccio/data/package/readme/storybook**

  - `packages\ui-components\src\AppTest\App.stories.tsx:33`
  - `packages\ui-components\src\layouts\Version\Version.stories.tsx:46`
  - `packages\ui-components\src\sections\Detail\Detail.stories.tsx:44`
  - `packages\ui-components\src\sections\Header\Header.stories.tsx:60`
  - `packages\ui-components\src\sections\SideBar\Sidebar.stories.tsx:24`

- **https://fake.verdaccio.org/-/verdaccio/data/packages**

  - `packages\ui-components\src\components\AppRoute\AppRoute.stories.tsx:83`
  - `packages\ui-components\src\sections\Home\Home.stories.tsx:36`

- **https://fake.verdaccio.org/-/verdaccio/data/search/***

  - `packages\ui-components\src\components\AppRoute\AppRoute.stories.tsx:94`
  - `packages\ui-components\src\components\Search\Search.stories.tsx:53`
  - `packages\ui-components\src\sections\Header\Header.stories.tsx:63`

- **https://fake.verdaccio.org/-/verdaccio/data/sidebar/***

  - `packages\ui-components\src\components\AppRoute\AppRoute.stories.tsx:86`

- **https://fake.verdaccio.org/-/verdaccio/data/sidebar/jquery**

  - `packages\ui-components\src\AppTest\App.stories.tsx:50`
  - `packages\ui-components\src\layouts\Version\Version.stories.tsx:75`
  - `packages\ui-components\src\sections\Detail\Detail.stories.tsx:57`

- **https://fake.verdaccio.org/-/verdaccio/data/sidebar/JSONStream**

  - `packages\ui-components\src\AppTest\App.stories.tsx:70`
  - `packages\ui-components\src\sections\Detail\Detail.stories.tsx:73`

- **https://fake.verdaccio.org/-/verdaccio/data/sidebar/kleur**

  - `packages\ui-components\src\AppTest\App.stories.tsx:87`

- **https://fake.verdaccio.org/-/verdaccio/data/sidebar/storybook**

  - `packages\ui-components\src\AppTest\App.stories.tsx:30`
  - `packages\ui-components\src\layouts\Version\Version.stories.tsx:43`
  - `packages\ui-components\src\sections\Detail\Detail.stories.tsx:41`
  - `packages\ui-components\src\sections\Header\Header.stories.tsx:57`
  - `packages\ui-components\src\sections\SideBar\Sidebar.stories.tsx:21`

- **https://fake.verdaccio.org/-/verdaccio/sec/login**

  - `packages\ui-components\src\components\AppRoute\AppRoute.stories.tsx:111`
  - `packages\ui-components\src\components\LoginDialog\LoginDialog.stories.tsx:26`
  - `packages\ui-components\src\sections\Header\Header.stories.tsx:82`
  - `packages\ui-components\src\sections\Security\Security.stories.tsx:20`

- **https://fake.verdaccio.org/storybook/-/storybook-6.5.15.tgz**

  - `packages\ui-components\src\sections\SideBar\Sidebar.stories.tsx:27`

- **https://fake.verdaccio.org/verdaccio/-/verdaccio-2.7.1.tgz**

  - `packages\ui-components\src\utils\__partials__\packageMeta.ts:586`

- **https://github.com/verdaccio-pro/verdaccio-pro.git**

  - `abappm\plugins\@verdaccio-pro\clerk\package.json:22`
  - `abappm\plugins\@verdaccio-pro\database\package.json:20`
  - `abappm\plugins\@verdaccio-pro\middleware\package.json:20`
  - `abappm\plugins\@verdaccio-pro\storage-sql\package.json:21`

- **https://github.com/verdaccio-pro/verdaccio-pro/issues**

  - `abappm\plugins\@verdaccio-pro\clerk\package.json:26`
  - `abappm\plugins\@verdaccio-pro\database\package.json:24`
  - `abappm\plugins\@verdaccio-pro\middleware\package.json:24`
  - `abappm\plugins\@verdaccio-pro\storage-sql\package.json:25`

- **https://github.com/verdaccio/contributing**

  - `.github\stale.yml:22`

- **https://github.com/verdaccio/e2e-tests/tree/7.x**

  - `VERSIONS.md:12`

- **https://github.com/verdaccio/ui/issues/119**

  - `packages\ui-components\src\utils\url.ts:67`

- **https://github.com/verdaccio/verdaccio/blob/5.x/CONTRIBUTING.md**

  - `CONTRIBUTING.md:3`

- **https://github.com/verdaccio/verdaccio/blob/master/docs/migration-v5-to-v6.md**

  - `VERSIONS.md:18`

- **https://github.com/verdaccio/verdaccio/tree/master/e2e/ui**

  - `CONTRIBUTING.md:19`

- **https://localhost:443/**

  - `packages\config\src\address.ts:22`

- **https://mswjs.io/docs/recipes/mocking-error-responses**

  - `packages\ui-components\.storybook\preview.tsx:45`

- **https://my.company.com/customJS.min.js**

  - `packages\config\src\conf\default.yaml:63`
  - `packages\config\src\conf\docker.yaml:63`

- **https://mycompany.com/npm**

  - `packages\proxy\src\proxy.ts:276`

- **https://registry.verdaccio.pro**

  - `.github\workflows\apm.yml:37`

- **https://registry.verdaccio.pro/**

  - `.github\workflows\apm.yml:34`

- **https://somedomain.org**

  - `abappm\conf\config.yaml:146`
  - `abappm\conf\config.yaml:150`
  - `packages\config\src\conf\default.yaml:151`
  - `packages\config\src\conf\default.yaml:155`
  - `packages\config\src\conf\docker.yaml:147`
  - `packages\config\src\conf\docker.yaml:151`

- **https://somedomain.org/**

  - `abappm\conf\config.yaml:152`
  - `packages\config\src\conf\default.yaml:157`
  - `packages\config\src\conf\docker.yaml:153`

- **https://somedomain.org/first_prefix**

  - `abappm\conf\config.yaml:154`
  - `packages\config\src\conf\default.yaml:159`
  - `packages\config\src\conf\docker.yaml:155`

- **https://somedomain.org/my_prefix/**

  - `abappm\conf\config.yaml:148`
  - `packages\config\src\conf\default.yaml:153`
  - `packages\config\src\conf\docker.yaml:149`

- **https://somedomain.org/second_prefix/**

  - `abappm\conf\config.yaml:156`
  - `packages\config\src\conf\default.yaml:161`
  - `packages\config\src\conf\docker.yaml:157`

- **https://something.local/**

  - `abappm\conf\config.yaml:201`
  - `packages\config\src\conf\default.yaml:205`
  - `packages\config\src\conf\docker.yaml:201`

- **https://specifications.freedesktop.org/basedir-spec/latest/**

  - `packages\config\src\config-path.ts:156`

- **https://unix:/tmp/http.sock**

  - `packages\config\src\address.ts:25`

- **https://usagge.hipchat.com/v2/room/3729485/notification?auth_token=mySecretToken**

  - `abappm\conf\config.yaml:208`
  - `packages\config\src\conf\default.yaml:212`
  - `packages\config\src\conf\docker.yaml:208`

- **https://verdaccio.nyc3.digitaloceanspaces.com/gpg/publickey.verdaccio@pm.me.asc**

  - `security.txt:2`

- **https://verdaccio.org/thanks.html**

  - `security.txt:3`

- **https://verdaccio.pro**

  - `abappm\plugins\@verdaccio-pro\clerk\package.json:19`
  - `abappm\plugins\@verdaccio-pro\database\package.json:17`
  - `abappm\plugins\@verdaccio-pro\middleware\package.json:17`
  - `abappm\plugins\@verdaccio-pro\storage-sql\package.json:18`

- **https://www.i18next.com/overview/configuration-options**

  - `packages\plugins\ui-theme\src\i18n\config.ts:23`

- **https://www.ifrc.org/**

  - `packages\plugins\ui-theme\src\components\Support\Support.tsx:22`

- **https://www.npmjs.com/org/verdaccio**

  - `VERSIONS.md:3`

- **https://www.npmjs.com/package/**

  - `packages\ui-components\src\utils\utils.ts:113`

- **https://www.npmjs.com/package/@verdaccio/ui-theme**

  - `RELEASES.md:94`

- **https://www.npmjs.com/package/country-flag-icons**

  - `CONTRIBUTING.md:396`

- **https://www.npmjs.com/package/debug**

  - `CONTRIBUTING.md:107`
  - `CONTRIBUTING.md:119`

- **https://www.npmjs.com/package/express-rate-limit**

  - `packages\config\src\serverSettings.ts:2`

- **https://www.npmjs.com/package/hpagent**

  - `packages\proxy\src\agent.ts:19`

- **https://www.npmjs.com/package/verdaccio**

  - `VERSIONS.md:3`
  - `VERSIONS.md:57`

- **https://www.npmjs.com/search?q=sinopia**

  - `CONTRIBUTING.md:407`

- **https://www.savethechildren.org/us/where-we-work/ukraine/**
  - `packages\plugins\ui-theme\src\components\Support\Support.tsx:18`
