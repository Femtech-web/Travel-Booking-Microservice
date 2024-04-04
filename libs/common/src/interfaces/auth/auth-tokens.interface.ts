export interface ITokenBase {
  iat: number;
  exp: number;
  iss: string;
  aud: string;
  sub: string;
}

export interface IAccessPayload {
  id: number | string;
}

export interface IAccessToken extends IAccessPayload, ITokenBase {}

export interface IEmailPayload extends IAccessPayload {
  version: number;
}

export interface IEmailToken extends IEmailPayload, ITokenBase {}

export interface IRefreshPayload extends IEmailPayload {
  tokenId: string;
}

export interface IRefreshToken extends IRefreshPayload, ITokenBase {}
