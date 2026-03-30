import buildDebug from 'debug';
import { isObject } from 'lodash-es';

const debug = buildDebug('verdaccio:config:parse-env');
/**
 * Parses an environment variable value to a string, number, boolean, object, or array.
 * @param envValue the environment variable value
 * @returns the parsed value
 */
function parseEnvValue(envValue: string): string | number | boolean | object | unknown[] {
  const trimmed = envValue.trim();
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    try {
      return JSON.parse(trimmed) as object;
    } catch {
      return envValue;
    }
  }
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      return JSON.parse(trimmed) as unknown[];
    } catch {
      return envValue;
    }
  }
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed !== '' && !Number.isNaN(Number(trimmed)) && /^-?\d+(\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }
  return envValue;
}

/**
 * Replaces config values that match environment variable names (uppercase + underscores) with process.env values.
 * Supports string, number, boolean, object, and array values.
 * @param config the config object to replace environment variables in
 */
export function replaceEnvVars(config: Record<string, unknown>): void {
  Object.keys(config).forEach((key) => {
    const value = config[key];
    if (
      typeof value === 'string' &&
      /^[A-Z0-9_]+$/.test(value) &&
      process.env[value] !== undefined
    ) {
      const envValue = process.env[value] as string;
      debug('replacing config %s value %o with env var %o', key, value, envValue);
      config[key] = parseEnvValue(envValue);
    } else if (isObject(value) && value !== null) {
      replaceEnvVars(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (isObject(item) && item !== null) {
          replaceEnvVars(item as Record<string, unknown>);
        }
      });
    }
  });
}
