import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'
import { Connection } from 'mongoose'
import { InjectConnection } from '@nestjs/mongoose'
import { User } from 'src/users/schema/user.schema'
import * as bcrypt from 'bcrypt'
import { JwtPayload } from './types/jwt-payload.interface'


@Injectable()
export class AuthService 
{
    constructor(
        @InjectConnection() private readonly connection: Connection,
        private readonly jwtService: JwtService,
    ) { }


    public async login(loginDto: LoginDto)
    {
        const { email, password } = loginDto

        const usuario: User = await this.connection.model(User.name).findOne({ email })

        if (!usuario)
            throw new BadRequestException('usuario does not exist')

        const match = await bcrypt.compare(password, usuario.password)

        if (!match)
            throw new BadRequestException('Contraseña incorrecta')

        delete usuario.password

        return {
            ...usuario,
            token: this.generateJwt({
                username: usuario.username,
                email: usuario.email,
                role: usuario.role,
                _id: usuario._id as string,
            })
        }
    }


    private generateJwt(payload: JwtPayload): string
    {
        return this.jwtService.sign(payload)
    }
}
