import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../types/jwt-payload.interface'
import { User } from 'src/users/schema/user.schema'
import { AuthService } from '../auth.service'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,
    ) 
    {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }


    public async validate(payload: JwtPayload): Promise<User> 
    {
        const { username, email, role, _id } = payload

        if (!email || !username || !role || !_id)
            throw new UnauthorizedException('Token not valid')

        const user = await this.authService.validateUser(_id)

        if (!user)
            throw new UnauthorizedException('Token no válido o usuario no existe')

        return {
            _id,
            email: user.email,
            username: user.username,
            role: user.role,
        } as User
    }
}