import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsService } from 'src/clients/clients.service';
import { TechniciansService } from 'src/technicians/technicians.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private techniciansService: TechniciansService,
    private clientsService: ClientsService
  ) { }

  async getOrders(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async createOrder(input: CreateOrderDto): Promise<Order> {
    let assignedTechnician: number = await this.techniciansService.assignTechnician();
    await this.clientsService.getClientById(+input.client_id);
    Object.assign(input, { techniciansorders: [{ "technician": assignedTechnician }] })
    return this.ordersRepository.save(input);
  }
}
