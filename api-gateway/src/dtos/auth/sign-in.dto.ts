import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export abstract class SignInDto {
  @IsEmail()
  @IsString()
  @Length(3, 255)
  public email!: string;

  @IsString()
  @MinLength(1)
  public password: string;
}
