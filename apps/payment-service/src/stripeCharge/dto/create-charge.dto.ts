import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  IsLowercase,
  ValidateNested,
} from 'class-validator';

class StripeMetadata {
  @IsString()
  booking_id: string;
}

export class CreateChargeDto {
  @IsNumber()
  amount: number;

  @IsString()
  @Length(3, 3)
  @IsLowercase()
  currency: string;

  @IsOptional()
  @IsEmail()
  receipt_email?: string;

  @IsString()
  card_token: string;

  @ValidateNested()
  metadata: StripeMetadata;
}
