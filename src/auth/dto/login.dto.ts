import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator'


export class LoginDto
{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    public password: string
}