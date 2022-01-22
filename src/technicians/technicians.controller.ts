import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateTechnicianDto, SignInTechnicianDto } from './dto/technician.dto';
import { Technician } from './entities/technician.entity';
import { TechniciansService } from './technicians.service';

@Controller('technicians')
@ApiTags('technicians')
export class TechniciansController {
  constructor(private readonly techniciansService: TechniciansService) { }

  @Get()
  @ApiOkResponse({ type: [Technician] })
  async getTechnicians(): Promise<Technician[]> {
    return this.techniciansService.getTechnicians();
  }

  @Post('/signin')
  @ApiCreatedResponse({ type: Technician })
  async signInTechnician(@Body() input: SignInTechnicianDto): Promise<Technician> {
    return this.techniciansService.signInTechnician(input);
  }

  @Post('/create')
  @ApiCreatedResponse({ type: Technician })
  async createTechnician(@Body() input: CreateTechnicianDto): Promise<Technician> {
    return this.techniciansService.createTechnician(input);
  }

}
