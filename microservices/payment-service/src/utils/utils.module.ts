import { Module, Global } from '@nestjs/common';
import { CommonService } from './common';

@Global()
@Module({
  imports: [],
  providers: [CommonService],
  exports: [CommonService],
})
export class UtilsModule {}
