import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configs/config.module';
import { UtilsModule } from './utils/utils.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [ConfigurationModule, AuthModule, TokenModule, UtilsModule],
})
export class AppModule {}
