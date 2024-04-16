import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigurationModule } from '../configs/config.module';
import { UtilsModule } from '../utils/utils.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [ConfigurationModule, UtilsModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
