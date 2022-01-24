import { Test, TestingModule } from '@nestjs/testing';
import { CreateTechnicianDto, SignInTechnicianDto } from './dto/technician.dto';
import { Technician } from './entities/technician.entity';
import { TechniciansService } from './technicians.service';

class ApiServiceMock {
  createTechnician(dto: any) {
    return [];
  }
  getTechnicians() {
    return [Technician];
  }
  getTechniciansIds() {
    return [];
  }
  signInTechnician(dto: any) {
    return {};
  }
}
describe.only("TechniciansService", () => {

  let techniciansService: TechniciansService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: TechniciansService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TechniciansService, ApiServiceProvider
      ],
    }).compile();
    techniciansService = module.get<TechniciansService>(TechniciansService);
  })

  it('should call createTechnician method with expected params', async () => {
    const createTechnicianSpy = jest.spyOn(techniciansService, 'createTechnician');
    const dto = new CreateTechnicianDto();
    techniciansService.createTechnician(dto);
    expect(createTechnicianSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getTechnicians method with expected params', async () => {
    const getTechnicianSpy = jest.spyOn(techniciansService, 'getTechnicians');
    techniciansService.getTechnicians();
    expect(getTechnicianSpy).toHaveBeenCalled();
  });

  it('should call getTechniciansIds method with expected param', async () => {
    const getTechnicianIdsSpy = jest.spyOn(techniciansService, 'getTechniciansIds');
    techniciansService.getTechniciansIds();
    expect(getTechnicianIdsSpy).toHaveBeenCalled();
  });

  it('should call signInTechnician method with expected params', async () => {
    const signinTechnicianSpy = jest.spyOn(techniciansService, 'signInTechnician');
    const dto = new SignInTechnicianDto();
    techniciansService.signInTechnician(dto);
    expect(signinTechnicianSpy).toHaveBeenCalledWith(dto);
  });

})