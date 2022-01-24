import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto } from './dto/order.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

class ApiServiceMock {
  createOrder(dto: any) {
    return [];
  }
  getOrders() {
    return [Order];
  }
}
describe.only("OrdersService", () => {

  let ordersService: OrdersService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: OrdersService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService, ApiServiceProvider
      ],
    }).compile();
    ordersService = module.get<OrdersService>(OrdersService);
  })

  it('should call createOrder method with expected params', async () => {
    const createOrderSpy = jest.spyOn(ordersService, 'createOrder');
    const dto = new CreateOrderDto();
    ordersService.createOrder(dto);
    expect(createOrderSpy).toHaveBeenCalledWith(dto);
  });

  it('should call getOrders method with expected params', async () => {
    const getOrderSpy = jest.spyOn(ordersService, 'getOrders');
    ordersService.getOrders();
    expect(getOrderSpy).toHaveBeenCalled();
  });
})