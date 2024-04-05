import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  RmqContext,
  Ctx,
  Payload,
} from '@nestjs/microservices';
import { TokenService } from './token.service';
import { CommonService } from '@app/common';

@Controller()
export class TokenController {
  constructor(
    private readonly tokenService: TokenService,
    private readonly commonService: CommonService,
  ) {}

  @MessagePattern({ cmd: 'generate-auth-tokens' })
  public async generateAuthTokens(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    console.log('data', data);
    const { user, domain, tokenId } = data;
    this.commonService.acknowledgeMessage(context);

    return this.tokenService.generateAuthTokens(user, domain, tokenId);
  }

  @MessagePattern({ cmd: 'generate-token' })
  public async generateToken(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('data', data);
    const { user, tokenType, domain, tokenId } = data;
    this.commonService.acknowledgeMessage(context);

    return this.tokenService.generateToken(user, tokenType, domain, tokenId);
  }

  @MessagePattern({ cmd: 'verify-token' })
  public async verifyToken(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('data', data);
    const { token, tokenType } = data;
    this.commonService.acknowledgeMessage(context);

    return this.tokenService.verifyToken(token, tokenType);
  }
}
