import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/client.dto';

describe("ClientsController Unit Tests", () => {
  let clientsController: ClientsController;
  let spyService: ClientsService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ClientsService,
      useFactory: () => ({
        createClient: jest.fn(() => []),
        getClients: jest.fn(() => []),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [ClientsService, ApiServiceProvider],
    }).compile();

    clientsController = app.get<ClientsController>(ClientsController);
    spyService = app.get<ClientsService>(ClientsService);
  })

  it("calling createClient method", () => {
    const dto = new CreateClientDto();
    expect(clientsController.createClient(dto)).not.toEqual(null);
  })

  it("calling createOrder method", () => {
    const dto = new CreateClientDto();
    clientsController.createClient(dto);
    expect(spyService.createClient).toHaveBeenCalled();
    expect(spyService.createClient).toHaveBeenCalledWith(dto);
  })

  it("calling getClients method", () => {
    clientsController.getClients();
    expect(spyService.getClients).toHaveBeenCalled();
  })
});