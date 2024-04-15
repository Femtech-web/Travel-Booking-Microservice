import { Injectable } from '@nestjs/common';
import { RmqContext, ClientProxy } from '@nestjs/microservices';
import { IPattern } from '../interfaces';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CommonService {
  constructor() {}

  acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }

  /**
   * Method used to send the request to the corresponding microservice. It accepts following parameters:
   *
   * - @param {ClientProxy} client - microservice client to send the message to
   * - @param {IPattern} pattern - object containing the pattern for a message (i.e. `{cmd: 'create' }`)
   * - @param {*} data - data to send to the microservice client
   *
   * @return {*} Promise<any> - returned response from a microservice or an adequate HTTP exception
   */

  public async sendEvent(
    client: ClientProxy,
    pattern: IPattern,
    data: any,
  ): Promise<any> {
    const observableRes = client.send(pattern, data);
    return await lastValueFrom(observableRes);
  }
}
