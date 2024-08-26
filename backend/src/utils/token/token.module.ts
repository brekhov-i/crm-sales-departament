import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";


@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('secret'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [],
  exports: [JwtModule]
})

export class TokenModule { }
