import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/client.dto';
import { Client } from './entities/client.entity';

@Controller('clients')
@ApiTags('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) { }

  @Get()
  @ApiOkResponse({ type: [Client] })
  getClients() {
    return this.clientsService.getClients();
  }

  @Post('/create')
  @ApiCreatedResponse({ type: Client })
  createClient(@Body() input: CreateClientDto) {
    return this.clientsService.createClient(input);
  }
}
