import { IConfig } from './interfaces';

export function config(): IConfig {
  return {
    rabbitmq_url: process.env.RABBITMQ_URL,
    paymentQueue: process.env.RABBITMQ_PAYMENT_QUEUE,
    bookingQueue: process.env.RABBITMQ_BOOKING_QUEUE,
    testing: process.env.TESTING === 'true',
    stripe_api_version: process.env.STRIPE_API_VERION,
    stripe_api_key: process.env.STRIPE_API_KEY,
    mongodb_config: {
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT, 10),
      url: process.env.MONGODB_URL,
      database: process.env.MONGODB_DB,
    },
  };
}
