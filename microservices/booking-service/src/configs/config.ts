import { IConfig } from './interfaces';

export function config(): IConfig {
  return {
    rabbitmq_url: process.env.RABBITMQ_URL,
    bookingQueue: process.env.RABBITMQ_BOOKING_QUEUE,
    testing: process.env.TESTING === 'true',
    mongodb_config: {
      host: process.env.MONGODB_HOST,
      port: parseInt(process.env.MONGODB_PORT, 10),
      url: process.env.MONGODB_URL,
      database: process.env.MONGODB_DB,
    },
  };
}
