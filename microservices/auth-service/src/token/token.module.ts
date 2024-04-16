import { Module } from '@nestjs/common';
import { UtilsModule } from '../utils/utils.module';
import { TokenService } from './token.service';

@Module({
  imports: [UtilsModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
