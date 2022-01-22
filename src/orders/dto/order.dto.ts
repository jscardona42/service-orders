import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Client } from "src/clients/entities/client.entity";
import { OrderType } from "../entities/order.entity";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    order_type: OrderType;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ default: 1 })
    @IsNotEmpty()
    client_id: Client;
}
