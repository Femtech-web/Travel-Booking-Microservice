import { IEmailConfig } from './email-config.interface';
import { IJwt } from './jwt.interface';
import { IQueues } from './queues.interface';

export interface IConfig {
  id: string;
  port: number;
  domain: string;
  refresh_cookie: string;
  cookie_secret: string;
  testing: boolean;
  rabbitmqQueues: IQueues;
  jwt: IJwt;
  rabbitmq_url: string;
  emailService: IEmailConfig;
}
