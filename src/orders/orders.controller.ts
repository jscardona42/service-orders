import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';

@Controller('orders')
@ApiTags('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Get()
  @ApiOkResponse({ type: [Order] })
  getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @Post('/create')
  @ApiCreatedResponse({ type: Order })
  createOrder(@Body() input: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(input);
  }
}
