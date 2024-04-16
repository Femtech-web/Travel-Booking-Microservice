import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UtilsModule } from '../utils/utils.module';
import { DbModule } from '../db/db.module';

@Module({
  imports: [UtilsModule, DbModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
