import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { UserModule } from '@/modules/user/user.module';
import { TokenModule } from '@/utils/token/token.module';

@Module({
  imports: [forwardRef(() => UserModule), TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
