import { Module } from '@nestjs/common';
import { MetaController } from './meta.controllers';
import { MetaService } from './meta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaterialConstructionSchema } from '@/utils/schemas/materialConstruction.schema';
import { StatusConstructionSchema } from '@/utils/schemas/statusConstruction.schema';
import { StatusApartmentsSchema } from '@/utils/schemas/statusApartments.schema';
import { RoleSchema } from '@/utils/schemas/role.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaterialConstructionSchema,
      StatusConstructionSchema,
      StatusApartmentsSchema,
      RoleSchema,
    ]),
  ],
  controllers: [MetaController],
  providers: [MetaService],
  exports: [TypeOrmModule],
})
export class MetaModule {}
