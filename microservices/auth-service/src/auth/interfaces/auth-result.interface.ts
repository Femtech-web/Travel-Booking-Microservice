import { IUser } from '../../token/interfaces';

export interface IAuthResult {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
