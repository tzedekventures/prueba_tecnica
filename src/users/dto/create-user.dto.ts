import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { UserRole } from '../schema/user.schema'


export class CreateUserDto 
{
    @IsString()
    @IsNotEmpty({ message: 'El nombre de usuario es requerido' })
    @MinLength(4, { message: 'El nombre de usuario debe tener al menos 4 caracteres' })
    @MaxLength(20, { message: 'El nombre de usuario no debe exceder 20 caracteres' })
    public readonly username: string

    @IsEmail({}, { message: 'Debe proporcionar un correo electrónico válido' })
    @IsNotEmpty({ message: 'El correo electrónico es requerido' })
    public readonly email: string

    @IsString()
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @MaxLength(20, { message: 'La contraseña no debe exceder 20 caracteres' })
    public password: string

    @IsString()
    @IsNotEmpty()
    @IsEnum(UserRole, { message: 'El rol debe ser "admin" o "user"' })
    public role?: UserRole
}