import fs from 'fs';
import { HttpResponse, http } from 'msw';

const packagesPayload = require('./api/home-packages.json');

function httpError(status: number) {
  return new HttpResponse(null, { status });
}

export const handlers = [
  http.get('http://localhost:9000/-/verdaccio/data/packages', () => {
    return HttpResponse.json(Array(400).fill(packagesPayload));
  }),

  http.get('http://localhost:9000/-/verdaccio/data/sidebar/storybook', ({ params }) => {
    const { v } = params;
    if (v) {
      return HttpResponse.json(require('./api/storybook-v.json'));
    } else {
      return HttpResponse.json(require('./api/storybook-sidebar.json'));
    }
  }),

  http.get('http://localhost:9000/-/verdaccio/data/search/*', () => {
    return HttpResponse.json(require('./api/search-verdaccio.json'));
  }),

  http.get('http://localhost:9000/-/verdaccio/data/package/readme/storybook', () => {
    return HttpResponse.text(require('./api/storybook-readme')());
  }),

  http.get('http://localhost:9000/-/verdaccio/data/sidebar/jquery', () => {
    return HttpResponse.json(require('./api/jquery-sidebar.json'));
  }),
  http.get('http://localhost:9000/-/verdaccio/data/sidebar/JSONStream', () => {
    return httpError(401); // unauthorized
  }),
  http.get('http://localhost:9000/-/verdaccio/data/sidebar/semver', () => {
    return httpError(500); // internal server error
  }),
  http.get('http://localhost:9000/-/verdaccio/data/sidebar/kleur', () => {
    return httpError(404); // not found
  }),
  http.get('http://localhost:9000/-/verdaccio/data/sidebar/glob', () => {
    return HttpResponse.json(require('./api/glob-sidebar.json'));
  }),
  http.get('http://localhost:9000/-/verdaccio/data/package/readme/glob', () => {
    return HttpResponse.text('foo glob');
  }),
  http.get('http://localhost:9000/-/verdaccio/data/sidebar/got', () => {
    return HttpResponse.json(require('./api/got-sidebar.json'));
  }),
  http.get('http://localhost:9000/-/verdaccio/data/package/readme/got', () => {
    return HttpResponse.text('foo got');
  }),
  http.get('http://localhost:9000/-/verdaccio/data/package/readme/jquery', () => {
    return HttpResponse.text(require('./api/jquery-readme')());
  }),
  http.get('http://localhost:9000/verdaccio/-/verdaccio-1.0.0.tgz', () => {
    const fileContent = fs.readFileSync('./api/verdaccio-1.0.0.tgz');
    return new HttpResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
  }),

  http.post('http://localhost:9000/-/verdaccio/sec/login', async ({ request }) => {
    const body = await request.json();
    // @ts-ignore
    if (body.username === 'fail') {
      return httpError(401);
    }

    return HttpResponse.json({
      // @ts-ignore
      username: body.username,
      token: 'valid token',
    });
  }),
];
