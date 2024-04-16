import { Module, Global } from '@nestjs/common';
import { CommonService } from './common';
import { RpcExceptionService } from './exception-handling';

@Global()
@Module({
  imports: [],
  providers: [CommonService, RpcExceptionService],
  exports: [CommonService, RpcExceptionService],
})
export class UtilsModule {}
