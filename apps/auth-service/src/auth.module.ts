import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule.registerRmq('USER_SERVICE', process.env.RABBITMQ_USER_QUEUE),
    CommonModule.registerRmq('TOKEN_SERVICE', process.env.RABBITMQ_TOKEN_QUEUE),
    CommonModule.registerRmq(
      'MAILER_SERVICE',
      process.env.RABBITMQ_MAILER_QUEUE,
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
