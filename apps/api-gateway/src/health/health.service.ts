import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  DiskHealthIndicator,
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealthIndicator: HttpHealthIndicator,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private readonly diskHealthIndicator: DiskHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly microserviceHealthIndicator: MicroserviceHealthIndicator,
    private readonly configService: ConfigService,
  ) {}

  checkHealth(): string {
    return 'API Gateway is working correctly';
  }

  checkPing() {
    return this.healthCheckService.check([
      () =>
        this.httpHealthIndicator.pingCheck(
          'thrillers-api',
          this.configService.get<string>('api-url'),
        ),
    ]);
  }

  checkDB() {
    return this.healthCheckService.check([
      () => this.typeOrmHealthIndicator.pingCheck('thrillers-database'),
    ]);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  checkDisk() {
    return this.healthCheckService.check([
      () =>
        this.diskHealthIndicator.checkStorage('thrillers-storage', {
          thresholdPercent: 0.9,
          path: '/',
        }),
    ]);
  }

  checkMemory() {
    return this.healthCheckService.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
      () =>
        this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }

  checkMicroservice(microserviceName: string) {
    return this.healthCheckService.check([
      () =>
        this.microserviceHealthIndicator.pingCheck(
          `rabbitmq-${microserviceName}`,
          {
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${process.env.RABBITMQ_URL}`],
              queue: `${microserviceName}_queue`,
              queueOptions: {
                durable: false,
              },
            },
          },
        ),
    ]);
  }
}
