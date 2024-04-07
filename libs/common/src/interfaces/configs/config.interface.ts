import { RedisOptions } from 'ioredis';
import { IEmailConfig } from './email-config.interface';
import { IJwt } from './jwt.interface';
import { IQueues } from './queues.interface';
import { IMongoDB } from './mongodb-config.interface';

export interface IConfig {
  id: string;
  port: number;
  domain: string;
  redis: RedisOptions;
  refresh_cookie: string;
  cookie_secret: string;
  testing: boolean;
  rabbitmqQueues: IQueues;
  jwt: IJwt;
  rabbitmq_url: string;
  emailService: IEmailConfig;
  mongodb_config: IMongoDB;
}
