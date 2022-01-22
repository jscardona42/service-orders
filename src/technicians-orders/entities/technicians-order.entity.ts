import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/entities/order.entity";
import { Technician } from "src/technicians/entities/technician.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Status {
    ASIGNADA = "ASIGNADA",
    FINALIZADA = "FINALIZADA"
}

@Entity()
export class TechniciansOrder {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    technician_order_id: number;

    @Column({ default: "ASIGNADO" })
    @ApiProperty()
    status: Status;

    @ApiProperty({ type: () => Technician })
    @JoinColumn({ name: "technician_id" })
    @ManyToOne(() => Technician, (technician: Technician) => technician.techniciansorders)
    technician: Technician;

    @ApiProperty({ type: () => Order })
    @JoinColumn({ name: "order_id" })
    @ManyToOne(() => Order, (order: Order) => order.techniciansorders)
    order: Order;
}

