import { Injectable } from '@nestjs/common';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';

@Injectable()
export class CacheConfig implements CacheOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    const ttl = this.configService.get<number>('jwt.refresh.time') * 1000;

    return this.configService.get<boolean>('testing')
      ? { ttl }
      : {
          store: await redisStore({
            ...this.configService.get('redis'),
            ttl,
          }),
        };
  }
}
