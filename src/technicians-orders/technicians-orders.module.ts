import { Module } from '@nestjs/common';
import { TechniciansOrdersService } from './technicians-orders.service';
import { TechniciansOrdersController } from './technicians-orders.controller';
import { TechniciansOrder } from './entities/technicians-order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TechniciansOrder])],
  controllers: [TechniciansOrdersController],
  providers: [TechniciansOrdersService]
})
export class TechniciansOrdersModule {}
