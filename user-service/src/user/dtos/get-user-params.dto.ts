import { IsString, Length } from 'class-validator';

export abstract class GetUserParams {
  @IsString()
  @Length(1, 106)
  public id: string;
}
