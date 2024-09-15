import { Module } from '@nestjs/common';
import { TelephonyService } from '@/modules/telephony/telephony.service';
import { TelephonyController } from '@/modules/telephony/telephony.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [TelephonyController],
  providers: [TelephonyService],
  exports: [TelephonyService],
})
export class TelephonyModule {}
