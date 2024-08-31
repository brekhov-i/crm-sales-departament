import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentSchema } from './apartment.schema';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentSchema])],
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [TypeOrmModule],
})
export class ApartmentModule {}
