import { CanActivate, ExecutionContext, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { User } from 'src/users/schema/user.schema'
import { META_ROLES } from '../decorators/role-protected.decorator'


@Injectable()
export class RolesGuard implements CanActivate 
{
    constructor(private reflector: Reflector) { }


    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> 
    {
        const roles = this.reflector.get<string[]>(META_ROLES, context.getHandler())

        const req = context.switchToHttp().getRequest()
        const user = req.user as User

        console.log(user)

        if (!user)
            throw new BadRequestException('User not found')

        if (!user.role)
            throw new UnauthorizedException('token no valido')

        if (user.role !== 'admin' && user.role !== 'user')
            throw new UnauthorizedException('role no valido')

        if (!roles.includes(user.role))
            throw new UnauthorizedException('No tiene permisos para acceder a este recurso')

        return true
    }
}