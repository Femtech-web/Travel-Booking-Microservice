import { Controller, Get, Param } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

import { HealthService } from './health.service';
import { Public } from '../decorators';

@Controller('api/v1/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Public()
  @Get()
  checkHealth(): string {
    return this.healthService.checkHealth();
  }

  @Public()
  @Get('/check-ping')
  @HealthCheck()
  checkPing() {
    return this.healthService.checkPing();
  }

  @Public()
  @Get('/check-memory')
  @HealthCheck()
  checkMemory() {
    return this.healthService.checkMemory();
  }

  @Public()
  @Get('/check-microservice/:name')
  @HealthCheck()
  checkMicroservice(@Param('name') microserviceName: string) {
    return this.healthService.checkMicroservice(microserviceName);
  }
}
