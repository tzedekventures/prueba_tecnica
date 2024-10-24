import { SetMetadata } from '@nestjs/common'

export const META_ROLES = 'roles'

export const RoleProtected = (...roles: string[]) => SetMetadata(META_ROLES, roles)