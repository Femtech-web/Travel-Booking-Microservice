import { IUser } from '../../interfaces/user/user.interface';
import { IAuthResponseUser } from '../../interfaces/auth/auth-response-user.interface';

export class AuthResponseUserMapper implements IAuthResponseUser {
  public id: string;
  public name: string;
  public email: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(values: IAuthResponseUser) {
    Object.assign(this, values);
  }

  public static map(user: IUser): AuthResponseUserMapper {
    return new AuthResponseUserMapper({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  }
}
