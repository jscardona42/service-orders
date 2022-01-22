import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTechnicianDto {
    @ApiProperty()
    @IsNotEmpty()
    full_name: string;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ required: false, nullable: true })
    salt?: string | null;
}


export class SignInTechnicianDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}