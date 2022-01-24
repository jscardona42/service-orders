import { Test, TestingModule } from '@nestjs/testing';
import { CreateTechnicianDto } from './dto/technician.dto';
import { TechniciansController } from './technicians.controller';
import { TechniciansService } from './technicians.service';

describe("TechniciansController Unit Tests", () => {
  let techniciansController: TechniciansController;
  let spyService: TechniciansService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: TechniciansService,
      useFactory: () => ({
        createTechnician: jest.fn(() => []),
        getTechnicians: jest.fn(() => []),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TechniciansController],
      providers: [TechniciansService, ApiServiceProvider],
    }).compile();

    techniciansController = app.get<TechniciansController>(TechniciansController);
    spyService = app.get<TechniciansService>(TechniciansService);
  })

  it("calling createTechnician method", () => {
    const dto = new CreateTechnicianDto();
    expect(techniciansController.createTechnician(dto)).not.toEqual(null);
  })

  it("calling createOrder method", () => {
    const dto = new CreateTechnicianDto();
    techniciansController.createTechnician(dto);
    expect(spyService.createTechnician).toHaveBeenCalled();
    expect(spyService.createTechnician).toHaveBeenCalledWith(dto);
  })

  it("calling getTechnicians method", () => {
    techniciansController.getTechnicians();
    expect(spyService.getTechnicians).toHaveBeenCalled();
  })
});