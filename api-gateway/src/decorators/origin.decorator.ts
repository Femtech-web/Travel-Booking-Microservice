import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICustomRequest } from '../interfaces/custom-request.interface';

export const Origin = createParamDecorator(
  (_, context: ExecutionContext): string | undefined => {
    return context.switchToHttp().getRequest<ICustomRequest>().headers?.origin;
  },
);
