import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { TechniciansService } from 'src/technicians/technicians.service';
import { Technician } from 'src/technicians/entities/technician.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { ClientsService } from 'src/clients/clients.service';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Order, Technician, Client]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, TechniciansService, ClientsService],
})
export class OrdersModule { }
