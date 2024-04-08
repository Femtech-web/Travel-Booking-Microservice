import { Test, TestingModule } from '@nestjs/testing';
import { RpcExceptionService } from '../utils/exception-handling';
import { StripeChargeService } from '../stripeCharge/stripeCharge.service';
import { PaymentService } from './payment.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, StripeChargeService, RpcExceptionService],
      imports: [CqrsModule],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
