import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';

import { CreateChargeDto } from './dto/create-charge.dto';

@Injectable()
export class StripeChargeService {
  constructor(
    @InjectStripe()
    private readonly stripeClient: Stripe,
  ) {}

  async createCharge(createChargeDto: CreateChargeDto): Promise<any> {
    return this.stripeClient.charges.create({
      amount: createChargeDto.amount,
      currency: createChargeDto.currency,
      source: createChargeDto.card_token,
      receipt_email: createChargeDto.receipt_email,
      metadata: createChargeDto.metadata as unknown as Stripe.MetadataParam,
    });
  }
}
