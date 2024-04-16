import { IConfig } from './interfaces';

export function config(): IConfig {
  return {
    domain: process.env.DOMAIN,
    rabbitmq_url: process.env.RABBITMQ_URL,
    mailerQueue: process.env.RABBITMQ_MAILER_QUEUE,
    emailService: {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: process.env.EMAIL_SECURE === 'true',
      service: process.env.EMAIL_SERVICE,
      auth: {
        clientId: process.env.EMAIL_CLIENT_ID,
        clientSecret: process.env.EMAIL_CLIENT_SECRET,
        refreshToken: process.env.EMAIL_REFRESH_TOKEN,
        user: process.env.EMAIL_USER,
        redirectUrl: process.env.EMAIL_REDIRECT_URI,
      },
    },
  };
}
