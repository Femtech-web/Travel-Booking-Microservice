import { IConfig } from './interfaces';

export function config(): IConfig {
  return {
    refresh_cookie: process.env.REFRESH_COOKIE,
    cookie_secret: process.env.COOKIE_SECRET,
    testing: process.env.TESTING === 'true',
    refresh_time: parseInt(process.env.JWT_REFRESH_TIME, 10),
    api_url: process.env.API_URL,
    rabbitmq_url: process.env.RABBITMQ_URL,
    authQueue: process.env.RABBITMQ_AUTH_QUEUE,
    userQueue: process.env.RABBITMQ_USER_QUEUE,
    paymentQueue: process.env.RABBITMQ_PAYMENT_QUEUE,
    bookingQueue: process.env.RABBITMQ_BOOKING_QUEUE,
  };
}
