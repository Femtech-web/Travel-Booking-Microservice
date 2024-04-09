import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICustomRequest } from '../interfaces/custom-request.interface';

export const Cookies = createParamDecorator(
  (cookieName: string = '', context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<ICustomRequest>();

    if (cookieName) {
      const tokenKey: string | undefined = req.cookies[cookieName];
      const token: string | undefined = req.signedCookies[tokenKey];
      return token || '';
    } else {
      return req.cookies;
    }
  },
);
