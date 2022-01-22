import { Test, TestingModule } from '@nestjs/testing';
import { TechniciansOrdersController } from './technicians-orders.controller';
import { TechniciansOrdersService } from './technicians-orders.service';

describe('TechniciansOrdersController', () => {
  let controller: TechniciansOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TechniciansOrdersController],
      providers: [TechniciansOrdersService],
    }).compile();

    controller = module.get<TechniciansOrdersController>(TechniciansOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
