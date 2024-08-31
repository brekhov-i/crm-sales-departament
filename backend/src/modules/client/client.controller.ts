import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('/client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  async getClients() {
    return await this.clientService.getAllClient();
  }

  @Get(':id')
  async getClient(@Param('id') id: string) {
    return await this.clientService.getClientById(Number(id));
  }

  @Post('/')
  async createClient(@Body() body: any) {
    return await this.clientService.createClient(body);
  }

  @Put('/:id')
  async updateClient(@Param('id') id: string, @Body() body: any) {
    return await this.clientService.updateClient(Number(id), body);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: string) {
    return await this.clientService.deleteClient(Number(id));
  }
}
