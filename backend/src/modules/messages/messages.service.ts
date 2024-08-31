import { Injectable } from '@nestjs/common';
import { client } from './modules/telegram';
import { Api } from 'telegram';
import * as BigInteger from 'big-integer';
import { MessageDto } from './dtos/message.dto';
import { type Client } from '@/utils/types/client';

@Injectable()
export class MessagesService {
  constructor() {}

  async findUserInTg(user: Client) {
    const tgId = Math.floor(Math.random() * 1e18);
    const result = await client.invoke(
      new Api.contacts.ImportContacts({
        contacts: [
          new Api.InputPhoneContact({
            clientId: BigInteger(tgId),
            phone: user.phone,
            firstName: user.firstname,
            lastName: user.lastname,
          }),
        ],
      }),
    );

    const clientId = result.users[0].id;

    user.telegram = clientId.toString();

    return user;
  }

  async sendMessageInTg(body: { telegramId: string; message: string }) {
    const message = await client.sendMessage(body.telegramId, {
      message: body.message,
    });

    return new MessageDto(message);
  }
}
