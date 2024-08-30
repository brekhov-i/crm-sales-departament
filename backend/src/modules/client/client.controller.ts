import { Controller, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('/client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get(':id')
  getClient(@Param('id') id: string) {
    //get info about clitn
  }
}
