import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../types/jwt-payload.interface'
import { User } from 'src/users/schema/user.schema'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(configService: ConfigService) 
    {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }


    public async validate(payload: JwtPayload): Promise<User> 
    {
        console.log('strategy')
        console.log(payload)

        const { username, email, role, _id } = payload

        if (!email || !username || !role || !_id)
            throw new UnauthorizedException('Token not valid')

        return { role, email, username, _id } as User
    }
}