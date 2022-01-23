import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTechnicianDto, SignInTechnicianDto } from './dto/technician.dto';
import { Technician } from './entities/technician.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TechniciansOrder } from 'src/technicians-orders/entities/technicians-order.entity';

@Injectable()
export class TechniciansService {

  constructor(
    @InjectRepository(Technician)
    private techniciansRepository: Repository<Technician>,
    private jwtService: JwtService,
  ) { }

  async getTechnicians(): Promise<Technician[]> {
    return this.techniciansRepository.createQueryBuilder("technician")
      .select(["Technician.full_name", "Technician.email", "Technician.technician_id"]).execute();
  }

  async getTechniciansIds(): Promise<Technician[]> {
    return this.techniciansRepository.createQueryBuilder("technician")
      .select(["Technician.technician_id"]).execute();
  }

  async createTechnician(input: CreateTechnicianDto): Promise<Technician> {
    await this.emailExists(input.email);
    const salt = await bcrypt.genSalt();
    input.password = await bcrypt.hash(input.password, salt);
    input.salt = salt;
    return (await this.techniciansRepository.insert(input)).raw;
  }

  async signInTechnician(input: SignInTechnicianDto): Promise<Technician> {
    let technician: any;
    let select = ["Technician.email", "Technician.full_name", "Technician.technician_id"];
    let salt: any;

    try {
      salt = await this.techniciansRepository.createQueryBuilder("technician")
        .where({ email: input.email })
        .select(["Technician.salt"]).execute();

      if (salt === undefined || salt === null || salt.length === 0) {
        throw new UnauthorizedException(`Credenciales inválidas`);
      }

      salt = salt[0].salt;

      technician = await this.techniciansRepository.createQueryBuilder("technician")
        .where({ email: input.email, password: await bcrypt.hash(input.password, salt) })
        .select(select).execute();

      if (technician === undefined || technician === null || technician.length === 0) {
        throw new UnauthorizedException(`Credenciales inválidas`);
      }
      const token = this.jwtService.sign({ technician_id: technician.technician_id });
      await this.saveToken(token, technician);

    } catch (error) {
      throw new UnauthorizedException("Error: " + error);
    }
    select.push("Technician.token");
    return this.techniciansRepository.createQueryBuilder("technician")
      .where({ email: input.email, password: await bcrypt.hash(input.password, salt) })
      .select(select).execute();
  }

  async saveToken(token: string, technician: Technician): Promise<void> {
    let technicianRtn = (await this.techniciansRepository.update(technician[0].technician_id, { token })).affected;
    if (technicianRtn === 0) {
      throw new UnauthorizedException("Error durante el guardado del token");
    }
  }

  async assignTechnician(): Promise<number> {
    let technicians = await this.getTechniciansIds();
    let arrayTechnician = [];
    technicians.forEach(tech => {
      arrayTechnician.push(tech.technician_id);
    });

    let rand = Math.floor(Math.random() * arrayTechnician.length);
    let randValue = arrayTechnician[rand];
    return randValue;
  }

  async emailExists(email: string): Promise<void> {
    let technician = await this.techniciansRepository.findOne({ where: { email: email } });

    if (technician !== undefined && technician !== null) {
      throw new InternalServerErrorException(`El email ya se encuentra registrado`);
    }
  }
}
