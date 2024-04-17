import { IAuthResponse, IAuthResult } from '../interfaces';
import { AuthResponseUserMapper } from './auth-response-user.mapper';

export class AuthResponseMapper implements IAuthResponse {
  public readonly user: AuthResponseUserMapper;
  public readonly accessToken: string;

  constructor(values: IAuthResponse) {
    Object.assign(this, values);
  }

  public static map(result: IAuthResult): AuthResponseMapper {
    return new AuthResponseMapper({
      user: AuthResponseUserMapper.map(result.user),
      accessToken: result.accessToken,
    });
  }
}
