import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) { }

  async getClients(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  async getClientById(id: number): Promise<Client> {
    let client = await this.clientsRepository.findOne({ where: { client_id: id } });

    if (client === undefined) {
      throw new InternalServerErrorException(`El cliente con id ${id} no existe`);
    }
    return client;
  }

  async createClient(input: CreateClientDto): Promise<any> {
    return this.clientsRepository.save(input);
  }

}
