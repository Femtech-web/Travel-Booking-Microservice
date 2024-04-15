import { IsString, Length } from 'class-validator';

export abstract class OriginDto {
  @IsString()
  @Length(5, 255)
  public origin?: string;
}
