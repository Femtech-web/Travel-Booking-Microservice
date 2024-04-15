import { IEmailConfig } from './email-config.interface';

export interface IConfig {
  domain: string;
  mailerQueue: string;
  rabbitmq_url: string;
  emailService: IEmailConfig;
}
