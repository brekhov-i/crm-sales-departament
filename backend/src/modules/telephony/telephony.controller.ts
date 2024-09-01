import { Controller, Get } from '@nestjs/common';
import { PbxService } from '@/modules/telephony/module/pbx.service';

@Controller('telephony')
export class TelephonyController {
  constructor(private readonly pbxModule: PbxService) {}

  @Get('/test')
  async test() {
    const res = await this.pbxModule.call('+79281172665', '+79169924340');

    console.log(res.data);
  }
}
