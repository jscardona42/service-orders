import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/client.dto';
import { Client } from './entities/client.entity';

class ApiServiceMock {
  createClient(dto: any) {
    return [];
  }
  getClients() {
    return [Client];
  }
  getClientById(id: number) {
    return Client;
  }
}
describe.only("ClientsService", () => {

  let clientsService: ClientsService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ClientsService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService, ApiServiceProvider
      ],
    }).compile();
    clientsService = module.get<ClientsService>(ClientsService);
  })

  it('should call createClient method with expected params', async () => {
    const createClientSpy = jest.spyOn(clientsService, 'createClient');
    const dto = new CreateClientDto();
    clientsService.createClient(dto);
    expect(createClientSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getClients method with expected params', async () => {
    const getClientsSpy = jest.spyOn(clientsService, 'getClients');
    clientsService.getClients();
    expect(getClientsSpy).toHaveBeenCalled();
  });

  it('should call getClientById method with expected param', async () => {
    const findOneNoteSpy = jest.spyOn(clientsService, 'getClientById');
    const id = 1;
    clientsService.getClientById(id);
    expect(findOneNoteSpy).toHaveBeenCalledWith(id);
  });
})