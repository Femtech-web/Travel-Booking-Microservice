import { readFileSync } from 'fs';
import { join } from 'path';
import { IConfig } from './interfaces/config.interface';
import { redisUrlParser } from '../utils/redis-url-parser.util';

export function config(): IConfig {
  const publicKey = readFileSync(
    join(__dirname, '../', '../', 'keys/public.key'),
    'utf-8',
  );
  const privateKey = readFileSync(
    join(__dirname, '../', '../', 'keys/private.key'),
    'utf-8',
  );

  return {
    id: process.env.APP_ID,
    port: parseInt(process.env.PORT, 10),
    domain: process.env.DOMAIN,
    rabbitmq_url: process.env.RABBITMQ_URL,
    refresh_cookie: process.env.REFRESH_COOKIE,
    cookie_secret: process.env.COOKIE_SECRET,
    testing: process.env.TESTING === 'true',
    redis: redisUrlParser(process.env.REDIS_URL),
    authQueue: process.env.RABBITMQ_AUTH_QUEUE,
    userQueue: process.env.RABBITMQ_USER_QUEUE,
    mailerQueue: process.env.RABBITMQ_MAILER_QUEUE,
    jwt: {
      access: {
        privateKey,
        publicKey,
        time: parseInt(process.env.JWT_ACCESS_TIME, 10),
      },
      confirmation: {
        secret: process.env.JWT_CONFIRMATION_SECRET,
        time: parseInt(process.env.JWT_CONFIRMATION_TIME, 10),
      },
      resetPassword: {
        secret: process.env.JWT_RESET_PASSWORD_SECRET,
        time: parseInt(process.env.JWT_RESET_PASSWORD_TIME, 10),
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        time: parseInt(process.env.JWT_REFRESH_TIME, 10),
      },
    },
  };
}
