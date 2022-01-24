import { Test, TestingModule } from '@nestjs/testing';
import { TechniciansOrdersController } from './technicians-orders.controller';
import { TechniciansOrdersService } from './technicians-orders.service';

describe("TechnicianOrdersController Unit Tests", () => {
  let techniciansOrdersController: TechniciansOrdersController;
  let spyService: TechniciansOrdersService

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: TechniciansOrdersService,
      useFactory: () => ({
        getTechnicianOrderByTechnicianId: jest.fn(() => []),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TechniciansOrdersController],
      providers: [TechniciansOrdersService, ApiServiceProvider],
    }).compile();

    techniciansOrdersController = app.get<TechniciansOrdersController>(TechniciansOrdersController);
    spyService = app.get<TechniciansOrdersService>(TechniciansOrdersService);
  })

  it("calling getTechnicianOrderByTechnicianId method", () => {
    const id: string = "1";
    techniciansOrdersController.getTechnicianOrderByTechnicianId(id);
    expect(spyService.getTechnicianOrderByTechnicianId).toHaveBeenCalled();
  })
});