import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSchema } from '@/modules/client/client.schema';
import { ClientController } from '@/modules/client/client.controller';
import { ClientService } from '@/modules/client/client.service';
import { UserModule } from '@/modules/user/user.module';
import { MessagesModule } from '@/modules/messages/messages.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientSchema]),
    forwardRef(() => MessagesModule),
    UserModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [TypeOrmModule, ClientService],
})
export class ClientModule {}
