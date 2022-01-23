import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";
import { Client } from "src/clients/entities/client.entity";
import { isDataView } from "util/types";
import { OrderType } from "../entities/order.entity";

export class CreateOrderDto {
    @ApiProperty()
    @IsNotEmpty()
    order_type: OrderType;

    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    order_date: Date;

    @ApiProperty({ default: 1 })
    @IsNotEmpty()
    client_id: Client;
}
