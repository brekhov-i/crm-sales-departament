import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
