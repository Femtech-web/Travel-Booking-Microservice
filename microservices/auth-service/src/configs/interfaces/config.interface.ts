import { RedisOptions } from 'ioredis';
import { IJwt } from '../../token/interfaces/jwt.interface';

export interface IConfig {
  id: string;
  port: number;
  domain: string;
  redis: RedisOptions;
  refresh_cookie: string;
  cookie_secret: string;
  testing: boolean;
  jwt: IJwt;
  rabbitmq_url: string;
  authQueue: string;
  mailerQueue: string;
  userQueue: string;
}
