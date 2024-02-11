import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    @Transform(({value}) => hashSync(value, 10), {groups: ['transform']})
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(11,11)
    phone_number: string;

    @IsString()
    @IsOptional()
    profile_img: string;
}
