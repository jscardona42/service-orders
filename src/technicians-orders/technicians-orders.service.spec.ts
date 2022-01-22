import { Test, TestingModule } from '@nestjs/testing';
import { TechniciansOrdersService } from './technicians-orders.service';

describe('TechniciansOrdersService', () => {
  let service: TechniciansOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechniciansOrdersService],
    }).compile();

    service = module.get<TechniciansOrdersService>(TechniciansOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
