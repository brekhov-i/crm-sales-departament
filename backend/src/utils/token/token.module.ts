import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TokenService } from "./token.service";
import { TokenSchema } from "./token.schema";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('secret'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([TokenSchema])
  ],
  providers: [TokenService],
  exports: [JwtModule, TokenService]
})

export class TokenModule { }
