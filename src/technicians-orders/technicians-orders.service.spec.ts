import { Test, TestingModule } from '@nestjs/testing';
import { TechniciansOrdersService } from './technicians-orders.service';

class ApiServiceMock {
  getTechnicianOrderByTechnicianId(id: any) {
    return [];
  }
}
describe.only("TechniciansOrdersService", () => {

  let techniciansOrdersService: TechniciansOrdersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: TechniciansOrdersService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechniciansOrdersService, ApiServiceProvider
      ],
    }).compile();
    techniciansOrdersService = module.get<TechniciansOrdersService>(TechniciansOrdersService);
  })

  it('should call getTechnicianOrderByTechnicianId method with expected params', async () => {
    const id: number = 1;
    const getTechnicianOrderSpy = jest.spyOn(techniciansOrdersService, 'getTechnicianOrderByTechnicianId');
    techniciansOrdersService.getTechnicianOrderByTechnicianId(id);
    expect(getTechnicianOrderSpy).toHaveBeenCalledWith(id);
  });
})