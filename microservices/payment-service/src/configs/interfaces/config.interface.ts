import { IMongoDB } from './mongodb-config.interface';

export interface IConfig {
  paymentQueue: string;
  bookingQueue: string;
  rabbitmq_url: string;
  stripe_api_key: string;
  stripe_api_version: string;
  testing: boolean;
  mongodb_config: IMongoDB;
}
