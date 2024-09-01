import { Module } from '@nestjs/common';
import { TelephonyController } from '@/modules/telephony/telephony.controller';
import { TelephonyService } from '@/modules/telephony/telephony.service';
import { PbxService } from '@/modules/telephony/module/pbx.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TelephonyController],
  providers: [TelephonyService, PbxService],
  exports: [TelephonyService, PbxService],
})
export class TelephonyModule {}
