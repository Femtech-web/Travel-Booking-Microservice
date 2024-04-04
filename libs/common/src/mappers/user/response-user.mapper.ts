import { IResponseUser } from '../../interfaces/user/response-user.interface';
import { IUser } from '../../interfaces/user/user.interface';

export class ResponseUserMapper implements IResponseUser {
  public id: string;
  public name: string;
  public createdAt: string;
  public updatedAt: string;

  constructor(values: IResponseUser) {
    Object.assign(this, values);
  }

  public static map(user: IUser): ResponseUserMapper {
    return new ResponseUserMapper({
      id: user.id,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    });
  }
}
