import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { TechniciansOrder } from './entities/technicians-order.entity';
import { TechniciansOrdersService } from './technicians-orders.service';

@Controller('technicians-orders')
@ApiTags('technicians-orders')
export class TechniciansOrdersController {
  constructor(
    private readonly techniciansOrdersService: TechniciansOrdersService
  ) { }

  @Get(':id')
  @ApiOkResponse({ type: [TechniciansOrder] })
  @ApiBearerAuth()
  @ApiHeader({ name: 'Authorization', description: "Authorization token" })
  @UseGuards(new JwtAuthGuard())
  async getTechnicianOrderByTechnicianId(@Param('id') id: string): Promise<TechniciansOrder[]> {
    return this.techniciansOrdersService.getTechnicianOrderByTechnicianId(+id);
  }

}
