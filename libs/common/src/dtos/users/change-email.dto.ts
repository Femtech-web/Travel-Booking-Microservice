import { IsEmail, IsString, Length } from 'class-validator';
import { PasswordDto } from './password.dto';

export abstract class ChangeEmailDto extends PasswordDto {
  @IsString()
  @IsEmail()
  @Length(5, 255)
  public email: string;
  @IsString()
  @Length(1, 255)
  public password: string;
}
