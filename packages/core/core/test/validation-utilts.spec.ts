import { describe, expect, test } from 'vitest';

import { DEFAULT_PASSWORD_VALIDATION, DIST_TAGS } from '../src/constants';
import {
  isObject,
  normalizeMetadata,
  validateName,
  validatePackage,
  validatePassword,
  validateUserName,
} from '../src/validation-utils';

describe('validatePackage', () => {
  test('should validate package names', () => {
    expect(validatePackage('-')).toBeTruthy();
    expect(validatePackage('--')).toBeTruthy();
    expect(validatePackage('a')).toBeTruthy();
    expect(validatePackage('a-')).toBeTruthy();
    expect(validatePackage('package-name')).toBeTruthy();
    expect(validatePackage('@scope/package-name')).toBeTruthy();
  });

  test('should fails on validate package names', () => {
    expect(validatePackage('package-name/test/fake')).toBeFalsy();
    expect(validatePackage('@/package-name')).toBeFalsy();
    expect(validatePackage('$%$%#$%$#%#$%$#')).toBeFalsy();
    expect(validatePackage('node_modules')).toBeFalsy();
    expect(validatePackage('__proto__')).toBeFalsy();
    expect(validatePackage('favicon.ico')).toBeFalsy();
    expect(validatePackage('%')).toBeFalsy();
  });
});

describe('isObject', () => {
  test('isObject metadata', () => {
    expect(isObject({ foo: 'bar' })).toBeTruthy();
    // expect(isObject('foo')).toBeTruthy();
    expect(isObject(['foo'])).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(undefined)).toBeFalsy();
    expect(isObject(true)).toBeFalsy();
  });
});

describe('normalizeMetadata', () => {
  test('should fills an empty metadata object', () => {
    // intended to fail with flow, do not remove
    // @ts-ignore
    expect(Object.keys(normalizeMetadata({}))).toContain(DIST_TAGS);
    // @ts-ignore
    expect(Object.keys(normalizeMetadata({}))).toContain('versions');
    // @ts-ignore
    expect(Object.keys(normalizeMetadata({}))).toContain('time');
  });

  test.skip('should fails the assertions is not an object', () => {
    expect(function () {
      // @ts-ignore
      normalizeMetadata('');
      // @ts-ignore
    }).toThrow(expect.hasAssertions());
  });

  test('should fails the assertions is name does not match', () => {
    expect(function () {
      // @ts-expect-error
      normalizeMetadata({}, 'no-name');
    }).toThrowError();
  });
});

describe('validateName', () => {
  test('should fails with no string', () => {
    // intended to fail with Typescript, do not remove
    // @ts-ignore
    expect(validateName(null)).toBeFalsy();
    // @ts-ignore
    expect(validateName(undefined)).toBeFalsy();
  });

  test('good ones', () => {
    expect(validateName('verdaccio')).toBeTruthy();
    expect(validateName('some.weird.package-zzz')).toBeTruthy();
    expect(validateName('--0.0.1.tgz')).toBeTruthy();
    expect(validateName('old-package@0.1.2.tgz')).toBeTruthy();
    // fix https://github.com/verdaccio/verdaccio/issues/1400
    expect(validateName('-build-infra')).toBeTruthy();
    expect(validateName('@pkg-scoped/without-extension')).toBeTruthy();
  });

  test('should be valid using uppercase', () => {
    expect(validateName('ETE')).toBeTruthy();
    expect(validateName('JSONStream')).toBeTruthy();
  });

  test('should fails with path seps', () => {
    expect(validateName('some/thing')).toBeFalsy();
    expect(validateName('some\\thing')).toBeFalsy();
  });

  test('should fail with no hidden files', () => {
    expect(validateName('.bin')).toBeFalsy();
  });

  test('should fails with reserved words', () => {
    expect(validateName('favicon.ico')).toBeFalsy();
    expect(validateName('node_modules')).toBeFalsy();
    expect(validateName('__proto__')).toBeFalsy();
  });

  test('should fails with other options', () => {
    expect(validateName('pk g')).toBeFalsy();
    expect(validateName('pk\tg')).toBeFalsy();
    expect(validateName('pk%20g')).toBeFalsy();
    expect(validateName('pk+g')).toBeFalsy();
    expect(validateName('pk:g')).toBeFalsy();
  });
});

describe('validatePassword', () => {
  test('should validate password according the length', () => {
    expect(validatePassword('12345', DEFAULT_PASSWORD_VALIDATION)).toBeTruthy();
  });

  test('should validate invalid regex', () => {
    // @ts-expect-error
    expect(validatePassword('12345', 34234342)).toBeFalsy();
  });

  test('should validate invalid regex (undefined)', () => {
    expect(validatePassword('12345', undefined)).toBeTruthy();
  });

  test('should validate invalid password)', () => {
    // @ts-expect-error
    expect(validatePassword(undefined)).toBeFalsy();
  });

  test('should validate invalid password number)', () => {
    // @ts-expect-error
    expect(validatePassword(2342344234342)).toBeFalsy();
  });

  test('should fails on validate password according the length', () => {
    expect(validatePassword('12345', /.{10}$/)).toBeFalsy();
  });

  test('should fails handle complex password validation', () => {
    expect(validatePassword('12345', /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)).toBeFalsy();
  });

  test('should handle complex password validation', () => {
    expect(
      validatePassword(
        'c<?_:srdsj&WyZgY}r4:l[F<RgV<}',
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    ).toBeTruthy();
  });

  test('should fails on validate password according the length and default config', () => {
    expect(validatePassword('12')).toBeFalsy();
  });

  test('should validate password according the length and default config', () => {
    expect(validatePassword('1235678910')).toBeTruthy();
  });
});

describe('validateUserName', () => {
  test('should validate username according to expected name', () => {
    expect(validateUserName('org.couchdb.user:test', 'test')).toBeTruthy();
  });

  test('should fail to validate username if different from expected name', () => {
    expect(validateUserName('org.couchdb.user:foouser', 'test')).toBeFalsy();
  });

  test('should fail to validate username if not given', () => {
    expect(validateUserName(undefined, 'test')).toBeFalsy();
  });
});
