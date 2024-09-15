import { Body, Controller, Get, Post } from '@nestjs/common';
import { TelephonyService } from './telephony.service';

@Controller('telephony')
export class TelephonyController {
  constructor(private readonly telephonyService: TelephonyService) {}

  @Post('/call')
  async makeCall() {
    await this.telephonyService.makeCall();
  }
}
