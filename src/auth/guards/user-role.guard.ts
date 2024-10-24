import { CanActivate, ExecutionContext, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { User } from 'src/users/schema/user.schema'


@Injectable()
export class RolesGuard implements CanActivate 
{
    public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> 
    {
        console.log('guard')

        const req = context.switchToHttp().getRequest()
        const user = req.user as User

        console.log(user)

        if (!user)
            throw new BadRequestException('User not found')

        if (!user.role)
            throw new UnauthorizedException('token no valido')

        if (user.role !== 'admin' && user.role !== 'user')
            throw new UnauthorizedException('role no valido')

        return true
    }
}