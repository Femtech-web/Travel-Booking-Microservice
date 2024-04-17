import { IsString } from 'class-validator';

export abstract class PaginationQueryDto {
  @IsString()
  public page?: string;

  @IsString()
  public perPage?: string;

  [keys: string]: any;
}
