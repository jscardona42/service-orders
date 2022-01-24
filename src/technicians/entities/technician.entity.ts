import { ApiProperty } from "@nestjs/swagger";
import { TechniciansOrder } from "../../technicians-orders/entities/technicians-order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Technician {
    @PrimaryGeneratedColumn()
    technician_id: number;

    @ApiProperty()
    @Column({})
    full_name: string;

    @ApiProperty()
    @Column({ unique: true })
    email: string;

    @ApiProperty()
    @Column({})
    password: string;

    @ApiProperty()
    @Column({ nullable: true })
    salt?: string;

    @ApiProperty()
    @Column({ nullable: true })
    token?: string;

    @OneToMany(() => TechniciansOrder, (technicianorder: TechniciansOrder) => technicianorder.technician, { cascade: true })
    @ApiProperty({ type: () => [TechniciansOrder] })
    public techniciansorders: TechniciansOrder[];
}
