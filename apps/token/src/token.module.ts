import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [CommonModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
