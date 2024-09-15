import { UserSchema } from '@/modules/user/user.schema';
import { ClientSchema } from '@/modules/client/client.schema';
import { RoleSchema } from '@/utils/schemas/role.schema';
import { TokenSchema } from '@/utils/token/token.schema';
import { ProductSchema } from '@/modules/product/product.schema';
import { ApartmentSchema } from '@/modules/apartment/apartment.schema';
import { ApartmentTypeSchema } from '@/modules/typeApartment/apartmentsType.schema';
import { StatusApartmentsSchema } from '@/utils/schemas/statusApartments.schema';
import { MaterialConstructionSchema } from '@/utils/schemas/materialConstruction.schema';
import { StatusConstructionSchema } from '@/utils/schemas/statusConstruction.schema';
import { DocumentsSchema } from '@/modules/documents/documents.schema';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const configDB = (
  configService: ConfigService,
): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASS'),
    database: configService.get('DB_NAME'),
    entities: [
      UserSchema,
      ClientSchema,
      RoleSchema,
      TokenSchema,
      ProductSchema,
      ApartmentSchema,
      ApartmentTypeSchema,
      StatusApartmentsSchema,
      MaterialConstructionSchema,
      StatusConstructionSchema,
      DocumentsSchema,
    ],
    synchronize: true,
  };
};
