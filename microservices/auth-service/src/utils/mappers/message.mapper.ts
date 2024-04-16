import { v4 } from 'uuid';
import { IMessage } from '../interfaces/message.interface';

export class MessageMapper implements IMessage {
  public id: string;
  public message: string;

  constructor(message: string) {
    this.id = v4();
    this.message = message;
  }
}
