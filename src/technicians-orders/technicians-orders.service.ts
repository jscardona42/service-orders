import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechniciansOrder } from './entities/technicians-order.entity';

@Injectable()
export class TechniciansOrdersService {

  constructor(
    @InjectRepository(TechniciansOrder)
    private techniciansOrdersRepository: Repository<TechniciansOrder>,
  ) { }

  async getTechnicianOrderByTechnicianId(technician_id: number): Promise<TechniciansOrder[]> {
    let technician = await this.techniciansOrdersRepository
      .createQueryBuilder("techniciansorders")
      .innerJoinAndSelect('techniciansorders.order', 'order')
      .where("techniciansorders.technician_id = :technician_id", { technician_id: technician_id })
      .getMany();

    if (technician === undefined || technician.length === 0) {
      throw new InternalServerErrorException(`El técnico con id ${technician_id} no tiene órdenes asociadas`);
    }
    return technician;
  }
}
