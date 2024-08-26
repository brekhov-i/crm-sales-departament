import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { UserSchema } from "./modules/user/user.schema";
import { Roles } from "./modules/user/role.schema";
import { TokenSchema } from "./utils/token/token.schema";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? '.development.env' : '.env',
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
        entities: [UserSchema, Roles, TokenSchema],
        synchronize: true,
      }),
      inject: [ConfigService]
    }),
    UserModule
  ],
  controllers: [],
})

export class AppModule { }
