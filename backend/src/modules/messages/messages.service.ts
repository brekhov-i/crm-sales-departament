import { UserService } from '../user/user.service';
import { Injectable } from '@nestjs/common';
import { client } from './modules/telegram';
import { Api } from 'telegram';
import * as BigInteger from 'big-integer';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class MessagesService {
  constructor(private userService: UserService) {}

  async findUserInTg(body: { id: string }) {
    const user = await this.userService.getUserById(body.id);

    if (!user) return;

    const id = Math.floor(Math.random() * 1e18);
    const result = await client.invoke(
      new Api.contacts.ImportContacts({
        contacts: [
          new Api.InputPhoneContact({
            clientId: BigInteger(id),
            phone: user.phone,
            firstName: user.firstname,
            lastName: user.lastname,
          }),
        ],
      }),
    );

    const userId = result.users[0].id;

    user.telegram = userId.toString();

    return await this.userService.updateUser(user);
  }

  async sendMessageInTg(body: { telegramId: string; message: string }) {
    const message = await client.sendMessage(body.telegramId, {
      message: body.message,
    });

    return new MessageDto(message);
  }
}
