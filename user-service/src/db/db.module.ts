import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [],
  providers: [PrismaService, UserRepository],
  exports: [UserRepository],
})
export class DbModule {}
