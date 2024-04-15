import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { CacheConfig } from './cache.config';
import {
  mailClientProvider,
  userClientProvider,
} from './transport-client.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useClass: CacheConfig,
    }),
  ],
  providers: [mailClientProvider, userClientProvider],
  exports: [mailClientProvider, userClientProvider],
})
export class ConfigurationModule {}
