import { SetMetadata } from '@nestjs/common'
import { Role } from './role.enum'

//自定义Roles装饰器
export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
