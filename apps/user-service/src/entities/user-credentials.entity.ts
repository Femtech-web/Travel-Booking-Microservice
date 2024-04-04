import { IsNumber, IsString } from 'class-validator';

export class CredentialsEntity {
  id?: string;

  @IsNumber()
  version: number;

  @IsString()
  lastPassword: string;

  @IsNumber()
  passwordUpdatedAt: number;

  @IsNumber()
  updatedAt: number;

  @IsString()
  userId: string;
}
