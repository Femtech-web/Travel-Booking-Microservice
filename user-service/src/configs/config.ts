import { IConfig } from './interfaces';

export function config(): IConfig {
  return {
    rabbitmq_url: process.env.RABBITMQ_URL,
    refresh_cookie: process.env.REFRESH_COOKIE,
    userQueue: process.env.RABBITMQ_USER_QUEUE,
  };
}
