export class CredentialsEntity {
  id?: string;
  version: number;
  lastPassword: string;
  passwordUpdatedAt: number;
  updatedAt: number;
  userId: string;
}
