import { applyDecorators, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from '../guards/user-role.guard'
import { RoleProtected } from './role-protected.decorator'


export function Auth(...roles: Array<any>) 
{
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), RolesGuard)
    )
}