import { ClientType } from "@prisma/client";
import { IsString, IsNotEmpty, IsEmail, Length, IsOptional } from "class-validator";

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(11,11)
    phone_number: string;

    @IsOptional()
    type: ClientType;
}
