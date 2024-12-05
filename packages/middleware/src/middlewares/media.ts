import { HEADER_TYPE, HTTP_STATUS, errorUtils } from '@verdaccio/core';

import { $NextFunctionVer, $RequestExtend, $ResponseExtend } from '../types';

export function media(expect: string | null): any {
  return function (req: $RequestExtend, res: $ResponseExtend, next: $NextFunctionVer): void {
    if (req.headers[HEADER_TYPE.CONTENT_TYPE] !== expect) {
      if (expect && req.headers[HEADER_TYPE.CONTENT_TYPE]?.includes(expect)) {
        next();
      } else {
        next(
          errorUtils.getCode(
            HTTP_STATUS.UNSUPPORTED_MEDIA,
            'wrong content-type, expect: ' +
              expect +
              ', got: ' +
              req.headers[HEADER_TYPE.CONTENT_TYPE] +
              ', headers: ' +
              JSON.stringify(req.headers)
          )
        );
      }
    } else {
      next();
    }
  };
}
