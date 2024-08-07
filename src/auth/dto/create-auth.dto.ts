import { IsNotEmpty, IsString } from "class-validator";
import { IsEmailUnique } from "../decorator/is-unique-email.decorator";

export class CreateAuthDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    @IsEmailUnique({ message: 'Email already exists' })
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    confirmPassword: string;

    companyId:string

}
