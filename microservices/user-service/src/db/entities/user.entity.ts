import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CredentialsEntity } from './user-credentials.entity';
import { NAME_REGEX, BCRYPT_HASH_OR_UNSET } from '../consts';

export class UserEntity {
  id?: string;

  @IsString()
  @Length(3, 100)
  @Matches(NAME_REGEX, {
    message: 'Name must not have special characters',
  })
  name: string;

  @IsString()
  @IsEmail()
  @Length(5, 255)
  email: string;

  @IsString()
  @Length(5, 60)
  @Matches(BCRYPT_HASH_OR_UNSET)
  password: string;

  @IsBoolean()
  isConfirmed?: boolean;

  @IsDate()
  createdAt?: Date;

  @IsDate()
  updatedAt?: Date;

  credentials?: CredentialsEntity;
}
