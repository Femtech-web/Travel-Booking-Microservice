import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CommonModule } from '@app/common';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [CommonModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
