import { Injectable, LoggerService, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { join } from 'path';
import { IEmailConfig, IUser } from '@app/common';
import { ITemplatedData } from './interfaces/template-data.interface';
import { ITemplates } from './interfaces/templates.interface';
import nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private readonly loggerService: LoggerService;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;
  private readonly refreshToken: string;
  private readonly userEmail: string;
  private readonly email: string;
  private readonly domain: string;
  private readonly service: string;
  private readonly host: string;
  private readonly port: number;
  private readonly templates: ITemplates;

  constructor(private readonly configService: ConfigService) {
    const emailConfig = this.configService.get<IEmailConfig>('emailService');
    console.log(emailConfig)
    this.email = `"My App" <${emailConfig.auth.user}>`;
    this.domain = this.configService.get<string>('domain');
    this.host = emailConfig.host;
    this.port = emailConfig.port;
    this.service = emailConfig.service;
    this.clientId = emailConfig.auth.clientId;
    this.clientSecret = emailConfig.auth.clientSecret;
    this.redirectUrl = emailConfig.auth.redirectUrl;
    this.refreshToken = emailConfig.auth.refreshToken;
    this.userEmail = emailConfig.auth.user;
    this.loggerService = new Logger(MailerService.name);
    this.templates = {
      confirmation: MailerService.parseTemplate('confirmation.hbs'),
      resetPassword: MailerService.parseTemplate('reset-password.hbs'),
    };
  }

  private static parseTemplate(
    templateName: string,
  ): Handlebars.TemplateDelegate<ITemplatedData> {
    const templateText = readFileSync(
      join(__dirname, 'templates', templateName),
      'utf-8',
    );
    return Handlebars.compile<ITemplatedData>(templateText, { strict: true });
  }

  private async createTransporter() {
    // Create a new Oauth2Client
    const oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectUrl,
    );

    // set the refresh token to your Oauth2Client
    oauth2Client.setCredentials({ refresh_token: this.refreshToken });

    // Get your access token
    try {
      const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject('Failed to create access token :(');
          }

          resolve(token);
        });
      });

      // create a new transporter with the necessary details of your Oauth2
      const transporter = await nodemailer.createTransport({
        service: this.service,
        host: this.host,
        port: this.port,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: this.userEmail,
          accessToken,
          clientId: this.clientId,
          clientSecret: this.clientSecret,
          refreshToken: this.refreshToken,
        },
      });

      // To verify if email transport was successful
      transporter.verify((err: any, success: any) => {
        if (err) {
          console.log('Verification error' + err);
          return;
        }
        console.log(`=== Server is ready to take messages: ${success} ===`);
      });

      return transporter;
    } catch (err) {
      console.log('------------------------------------------------');
      console.log(
        this.userEmail,
        this.clientId,
        this.clientSecret,
        this.refreshToken,
        this.redirectUrl
      );
      console.log('------------------------------------------------');
      console.log('Error creating transporter:', err);
      throw new Error('Failed to create transporter');
    }
  }

  public sendConfirmationEmail(user: IUser, token: string): void {
    const { email, name } = user;
    const subject = 'Confirm your email';
    const html = this.templates.confirmation({
      name,
      link: `https://${this.domain}/auth/confirm-email/${token}`,
    });
    this.sendEmail(email, subject, html, 'A new confirmation email was sent.');
  }

  public sendResetPasswordEmail(user: IUser, token: string): void {
    const { email, name } = user;
    const subject = 'Reset your password';
    const html = this.templates.resetPassword({
      name,
      link: `https://${this.domain}/auth/reset-password/${token}`,
    });
    this.sendEmail(
      email,
      subject,
      html,
      'A new reset password email was sent.',
    );
  }

  public async sendEmail(
    to: string,
    subject: string,
    html: string,
    log?: string,
  ): Promise<void> {
    const transporter = await this.createTransporter();
    console.log(transporter)
    transporter
      .sendMail({
        from: this.email,
        to,
        subject,
        html,
      })
      .then(() => this.loggerService.log(log ?? 'A new email was sent.'))
      .catch((error) => this.loggerService.error(error));
  }
}
