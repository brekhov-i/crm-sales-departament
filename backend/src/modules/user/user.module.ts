import { Module } from "@nestjs/common";
import { TokenModule } from "src/utils/token/token.module";
import { UserController } from "./user.controller";


@Module({
  imports: [TokenModule],
  controllers: [UserController],
  providers: [],
  exports: []
})

export class UserModule { };
