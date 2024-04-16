import { IsOptional, IsString } from 'class-validator';
import { PasswordsDto } from './passwords.dto';

export abstract class ChangePasswordDto extends PasswordsDto {
  @IsString()
  @IsOptional()
  public password?: string;
}
