import { Test, TestingModule } from '@nestjs/testing';
import { StripeChargeService } from './stripe-charge.service';

describe('StripeChargeService', () => {
  let service: StripeChargeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeChargeService],
    }).compile();

    service = module.get<StripeChargeService>(StripeChargeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
