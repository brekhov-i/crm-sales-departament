import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentTypeSchema } from './apartmentsType.schema';
import { ApartmentTypeController } from './apartmentType.controller';
import { ApartmentTypeService } from './apartmentType.service';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentTypeSchema])],
  controllers: [ApartmentTypeController],
  providers: [ApartmentTypeService],
  exports: [TypeOrmModule],
})
export class ApartmentTypeModule {}
