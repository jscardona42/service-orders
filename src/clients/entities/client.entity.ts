import { Order } from "../../orders/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    client_id: number;

    @Column({})
    @ApiProperty()
    full_name: string;

    @OneToMany(() => Order, (order: Order) => order.client_id)
    @ApiProperty({ type: () => [Order] })
    public orders: Order[];
}
