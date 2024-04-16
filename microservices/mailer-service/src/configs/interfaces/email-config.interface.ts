interface IEmailAuth {
  user: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  redirectUrl: string;
}

export interface IEmailConfig {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: IEmailAuth;
}
