import { Request } from 'express';

export interface ICustomRequest extends Request {
  user?: string | any;
}
