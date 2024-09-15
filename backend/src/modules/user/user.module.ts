import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { RoleSchema } from '@/utils/schemas/role.schema';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthModule } from '@/modules/auth/auth.module';
import { TokenModule } from '@/utils/token/token.module';
import { MetaModule } from '@/modules/meta/meta.module';

@Module({
  imports: [
    TokenModule,
    MetaModule,
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserSchema, RoleSchema]),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
