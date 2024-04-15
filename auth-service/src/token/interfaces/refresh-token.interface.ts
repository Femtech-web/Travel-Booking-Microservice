import { IEmailPayload } from './email-token.interface';
import { ITokenBase } from './token-base.interface';

export interface IRefreshPayload extends IEmailPayload {
  tokenId: string;
}

export interface IRefreshToken extends IRefreshPayload, ITokenBase {}
