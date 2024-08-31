import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { UserSchema } from './modules/user/user.schema';
import { RoleSchema } from './utils/schemas/role.schema';
import { TokenSchema } from './utils/token/token.schema';
import { MessagesModule } from './modules/messages/messages.module';
import { ProductSchema } from './modules/product/product.schema';
import { ApartmentSchema } from '@/modules/apartment/apartment.schema';
import { ApartmentTypeSchema } from '@/modules/typeApartment/apartmentsType.schema';
import { ProductModule } from './modules/product/product.module';
import { ApartmentModule } from '@/modules/apartment/apartment.module';
import { ApartmentTypeModule } from '@/modules/typeApartment/apartmentType.module';
import { StatusApartmentsSchema } from './utils/schemas/statusApartments.schema';
import { MaterialConstructionSchema } from './utils/schemas/materialConstruction.schema';
import { StatusConstructionSchema } from './utils/schemas/statusConstruction.schema';
import { ClientSchema } from '@/modules/client/client.schema';
import { AuthModule } from '@/modules/auth/auth.module';
import { MetaModule } from '@/modules/meta/meta.module';
import { ClientModule } from '@/modules/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development' ? '.development.env' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
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
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    MessagesModule,
    ClientModule,
    ProductModule,
    ApartmentModule,
    ApartmentTypeModule,
    MetaModule,
  ],
  controllers: [],
})
export class AppModule {}
