import { IsString, MinLength } from 'class-validator';

export abstract class PasswordDto {
  @IsString()
  @MinLength(1)
  public password: string;
}
