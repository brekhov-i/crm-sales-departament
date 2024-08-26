import { Module } from "@nestjs/common";
import { TokenModule } from "src/utils/token/token.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSchema } from "./user.schema";
import { ConfigService } from "@nestjs/config";
import { Roles } from "./role.schema";
import { AuthController } from "./auth.controller";


@Module({
  imports: [TokenModule, TypeOrmModule.forFeature([UserSchema, Roles])],
  controllers: [UserController, AuthController],
  providers: [UserService],
  exports: []
})

export class UserModule { };
