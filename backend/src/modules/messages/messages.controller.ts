import { Body, Controller, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('/messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}

  @Post('/telegram/findUser')
  async findUserInTelegram(@Body() body: any) {
    await this.messageService.findUserInTg(body);
  }

  @Post('/telegram/sendMessage')
  async sendMessageInTelegram(
    @Body() body: { telegramId: string; message: string },
  ) {
    return await this.messageService.sendMessageInTg(body);
  }
}
