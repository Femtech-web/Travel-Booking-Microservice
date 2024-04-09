import { ICredentials } from './credentials.interface';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  isConfirmed?: boolean;
  credentials?: ICredentials;
  createdAt?: Date;
  updatedAt?: Date;
}
