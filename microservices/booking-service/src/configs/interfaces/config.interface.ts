import { IMongoDB } from './mongodb-config.interface';

export interface IConfig {
  bookingQueue: string;
  rabbitmq_url: string;
  testing: boolean;
  mongodb_config: IMongoDB;
}
