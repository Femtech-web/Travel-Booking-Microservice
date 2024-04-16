export interface IConfig {
  refresh_cookie: string;
  cookie_secret: string;
  testing: boolean;
  refresh_time: number;
  rabbitmq_url: string;
  api_url: string;
  authQueue: string;
  userQueue: string;
  paymentQueue: string;
  bookingQueue: string;
}
