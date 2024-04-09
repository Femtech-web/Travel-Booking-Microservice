import { Controller, Get, Param } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

import { HealthService } from './health.service';

@Controller('api/health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  checkHealth(): string {
    return this.healthService.checkHealth();
  }

  @Get('/check-ping')
  @HealthCheck()
  checkPing() {
    return this.healthService.checkPing();
  }

  @Get('/check-db')
  @HealthCheck()
  checkDB() {
    return this.healthService.checkDB();
  }

  @Get('/check-memory')
  @HealthCheck()
  checkMemory() {
    return this.healthService.checkMemory();
  }

  @Get('/check-microservice/:name')
  @HealthCheck()
  checkMicroservice(@Param('name') microserviceName: string) {
    return this.healthService.checkMicroservice(microserviceName);
  }
}
