import { IUser } from '../user/user.interface';

export interface IAuthResult {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
