import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/order.dto';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe("OrdersController Unit Tests", () => {
  let ordersController: OrdersController;
  let spyService: OrdersService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: OrdersService,
      useFactory: () => ({
        createOrder: jest.fn(() => []),
        getOrders: jest.fn(() => []),
        findOneNote: jest.fn(() => { }),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, ApiServiceProvider],
    }).compile();

    ordersController = app.get<OrdersController>(OrdersController);
    spyService = app.get<OrdersService>(OrdersService);
  })

  it("calling createOrder method", () => {
    const dto = new CreateOrderDto();
    expect(ordersController.createOrder(dto)).not.toEqual(null);
  })

  it("calling createOrder method", () => {
    const dto = new CreateOrderDto();
    ordersController.createOrder(dto);
    expect(spyService.createOrder).toHaveBeenCalled();
    expect(spyService.createOrder).toHaveBeenCalledWith(dto);
  })

  it("calling getAllNote method", () => {
    ordersController.getOrders();
    expect(spyService.getOrders).toHaveBeenCalled();
  })
});