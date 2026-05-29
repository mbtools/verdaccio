import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const proPlugins = join(root, '@verdaccio-pro');
const databaseDir = join(proPlugins, 'database');

const plugins = ['clerk', 'middleware', 'storage-sql'];

const registry = process.env.VERDACCIO_BUILD_REGISTRY ?? 'https://registry.npmjs.org';

const pnpmInstallArgs = [
  'install',
  '--prod',
  '--no-optional',
  '--ignore-scripts',
  '--ignore-workspace',
  '--registry',
  registry,
];

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      CI: 'true',
      npm_config_registry: registry,
    },
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

console.log('Packing @verdaccio-pro/database...');
run('npm', ['pack'], databaseDir);

for (const name of plugins) {
  console.log(`\nInstalling @verdaccio-pro/${name}...`);
  run('pnpm', pnpmInstallArgs, join(proPlugins, name));
}

console.log('\nDone.');
