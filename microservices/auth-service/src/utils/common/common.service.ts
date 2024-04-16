import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  RmqContext,
  RmqOptions,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';
import { RpcExceptionService } from '../exception-handling';
import { validate, ValidationError } from 'class-validator';
import { isNull, isUndefined } from '../validation.utils';
import { MessageMapper } from '../mappers/message.mapper';
import { IPattern } from '../interfaces/client-pattern.interface';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CommonService {
  private readonly loggerService: LoggerService;

  constructor(
    private readonly configService: ConfigService,
    private readonly rpcException: RpcExceptionService,
  ) {
    this.loggerService = new Logger(CommonService.name);
  }

  getRmqOptions(queue: string): RmqOptions {
    const URL = this.configService.get('rabbitmq_url');

    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${URL}`],
        noAck: false,
        queue,
        queueOptions: {
          durable: true,
        },
      },
    };
  }

  acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }

  /**
   * Validate Entity
   *
   * Validates an entities with the class-validator library
   */
  public async validateEntity(entity: Record<string, any>): Promise<void> {
    const errors: ValidationError[] = await validate(entity);
    const messages: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        messages.push(...Object.values(error.constraints));
      }
    }

    if (messages.length > 0) {
      this.rpcException.throwBadRequest(messages.join(',\n'));
    }
  }

  /**
   * Check Entity Existence
   *
   * Checks if a findOne query didn't return null or undefined
   */
  public checkEntityExistence<T>(
    entity: T | null | undefined,
    name: string,
  ): void {
    if (isNull(entity) || isUndefined(entity)) {
      this.rpcException.throwNotFound(`${name} not found`);
    }
  }

  /**
   * Save Entity
   *
   * Validates entities before saving into the DB
   */
  public async saveEntity<T>(entity: T): Promise<void> {
    try {
      await this.validateEntity(entity);
    } catch (error) {
      this.loggerService.error(error);
      this.rpcException.throwBadRequest(error.message);
    }
  }

  /**
   * Throw Internal Error
   *
   * Function to abstract throwing internal server exception
   */
  public async throwInternalError<T>(promise: Promise<T>): Promise<T> {
    try {
      return await promise;
    } catch (error) {
      this.loggerService.error(error);
      this.rpcException.throwCatchedException(error);
    }
  }

  /**
   * Format Name
   *
   * Takes a string trims it and capitalizes every word
   */
  public formatName(title: string): string {
    return title
      .trim()
      .replace(/\n/g, ' ')
      .replace(/\s\s+/g, ' ')
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
  }

  public generateMessage(message: string): MessageMapper {
    return new MessageMapper(message);
  }

  /**
   * Method used to send the request to the corresponding microservice. It accepts following parameters:
   *
   * - @param {ClientProxy} client - microservice client to send the message to
   * - @param {IMessagePattern} pattern - object containing the pattern for a message (i.e. `{cmd: 'create' }`)
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
