import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateClientDto {
    @ApiProperty()
    @IsNotEmpty()
    full_name: string;
}