import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
// import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
// import { redisStore } from 'cache-manager-ioredis-yet';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const config = this.configService.get('mongodb_config');

    return this.configService.get<boolean>('testing')
      ? {
          type: 'mongodb',
          host: config.host,
          port: config.port,
          database: config.database,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          synchronize: true,
          autoLoadEntities: true,
        }
      : {
          type: 'mongodb',
          url: config.url,
          useNewUrlParser: true,
          synchronize: true,
          logging: true,
          authSource: 'admin',
          autoLoadEntities: true,
        };
  }
}
