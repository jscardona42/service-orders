import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/clients/entities/client.entity";
import { TechniciansOrder } from "src/technicians-orders/entities/technicians-order.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum OrderType {
    MANTENIMIENTO = "MANTENIMIENTO",
    INSTALACION = "INSTALACION"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    order_id: number;

    @Column()
    @ApiProperty()
    order_type: OrderType;

    @Column()
    @ApiProperty()
    description: string;

    @JoinColumn({ name: "client_id" })
    @ApiProperty({ type: () => Client })
    @ManyToOne(() => Client, (client: Client) => client.orders)
    client_id: Client;

    @OneToMany(() => TechniciansOrder, (technicianorder: TechniciansOrder) => technicianorder.order, { cascade: true })
    @ApiProperty({ type: () => [TechniciansOrder] })
    public techniciansorders: TechniciansOrder[];
}
