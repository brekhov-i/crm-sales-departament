import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientBody } from '@/utils/types/client';
import { UserDto } from '@/modules/user/dtos/user.dto';
import { MessagesService } from '@/modules/messages/messages.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientSchema } from '@/modules/client/client.schema';
import { Repository } from 'typeorm';
import { UserSchema } from '@/modules/user/user.schema';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientSchema)
    private clientModel: Repository<ClientSchema>,
    @InjectRepository(UserSchema)
    private userModel: Repository<UserSchema>,
    private massagesService: MessagesService,
  ) {}

  async getAllClient() {
    return await this.clientModel.find();
  }

  async getClientById(id: number) {
    return await this.clientModel.findOne({ where: { id } });
  }

  async createClient(body: ClientBody) {
    const candidate = await this.clientModel.findOne({
      where: { phone: body.phone },
    });

    if (candidate)
      throw new HttpException('Клиент уже существует', HttpStatus.CONFLICT);

    const manager = await this.userModel.findOne({
      where: { id: body.manager },
    });

    const client = this.clientModel.create({
      ...body,
      manager: new UserDto(manager),
    });

    return await this.clientModel.save(client).then(async (res) => {
      await this.massagesService
        .findUserInTg(res)
        .then((user) => this.updateClient(res.id, user));

      return await this.getClientById(res.id);
    });
  }

  async updateClient(id: number, body: any) {
    const candidate = await this.clientModel.findOne({
      where: { phone: body.phone },
    });

    if (!candidate)
      throw new HttpException('Клиента несуществует', HttpStatus.CONFLICT);

    return await this.clientModel.update(id, body);
  }

  async deleteClient(id: number) {
    return await this.clientModel.delete(id);
  }
}
