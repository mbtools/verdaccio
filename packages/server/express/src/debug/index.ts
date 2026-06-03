import type { Application } from 'express';

import type { Config as IConfig } from '@verdaccio/types';

import type { $NextFunctionVer, $RequestExtend, $ResponseExtend } from '../../types/custom';

export default (app: Application, config: IConfig): void => {
  // Hook for tests only
  app.get(
    '/-/_debug',
    function (req: $RequestExtend, res: $ResponseExtend, next: $NextFunctionVer): void {
      if (global.gc) {
        global.gc();
      }

      const maskedConfig = { ...config, secret: '********' };
      if (config.auth?.htpasswd) {
        maskedConfig.auth = {
          ...config.auth,
          htpasswd: {
            ...config.auth.htpasswd,
            file: '********',
          },
        };
      }

      // mask env DATABASE_URL
      const env = { ...process.env };
      env.DATABASE_URL = '********';
      env.DATABASE_SECRET = '********';
      env.DB_SALT = '********';
      env.CLERK_SECRET_KEY = '********';
      const sortedEnv: Record<string, string | undefined> = {};
      Object.keys(env)
        .sort()
        .forEach((key) => {
          sortedEnv[key] = env[key];
        });

      next({
        pid: process.pid,
        // @ts-ignore
        main: process.main,
        config: maskedConfig,
        env: sortedEnv,
        uptime: process.uptime(),
        mem: process.memoryUsage(),
        gc: global.gc,
      });
    }
  );
};
