import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { ROLES_KEY } from './role.decorator'
import { Reflector } from '@nestjs/core'
import { Role } from './role.enum'
import { Request } from 'express'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(requireRoles: Role[], sessionRole: Role) {
    if (requireRoles.includes(sessionRole)) {
      return true
    } else {
      throw new UnauthorizedException({
        statusCode: 403,
        message: '没有权限',
        error: 'Forbidden',
      })
    }
  }
  canActivate(context: ExecutionContext): boolean {
    //获取守卫上下文自定义元数据
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler())
    console.log(roles)
    if (!roles) {
      return true
    }
    //获取当前登录角色
    const request: Request = context.switchToHttp().getRequest()
    const role = request.session.session_role
    console.log(role)

    //根据分配给当前用户的角色与当前正在处理的路由所需的实际角色进行比较
    return this.matchRoles(roles, role)
  }
}
