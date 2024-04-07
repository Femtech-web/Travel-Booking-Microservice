import { readFileSync } from 'fs';
import { join } from 'path';
import { IConfig } from '../interfaces/configs/config.interface';
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
    rabbitmqQueues: {
      authQueue: process.env.RABBITMQ_AUTH_QUEUE,
      tokenQueue: process.env.RABBITMQ_TOKEN_QUEUE,
      mailerQueue: process.env.RABBITMQ_MAILER_QUEUE,
      userQueue: process.env.RABBITMQ_USER_QUEUE,
    },
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
    emailService: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.EMAIL_SECURE === 'true',
      service: process.env.EMAIL_SERVICE,
      auth: {
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_PASSWORD,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        user: process.env.EMAIL_USER,
        redirectUrl: process.env.EMAIL_REDIRECT_URL,
      },
    },
    mongodb_config: {
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT, 10),
      url: process.env.MONGODB_URL,
      database: process.env.MONGODB_DB,
    },
  };
}
