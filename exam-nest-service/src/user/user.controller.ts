import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, FindUserDto, LoginDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Role } from 'src/role/role.enum'
import { DbFindDate } from 'src/db/type'
import { Request } from 'express'
import { HttpRes } from 'src/types/httpRes'
import { getMenuFactory } from 'src/config/config'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async user_login(@Body() body: LoginDto, @Req() request: Request) {
    let role: Role
    switch (body.password) {
      case '111111':
        role = Role.STUDENT
        break

      case '222222':
        role = Role.TEACHER
        break

      case '333333':
        role = Role.ADMIN
        break
    }

    //根据号码查询对应用户

    console.log(role)

    const user_db: DbFindDate<FindUserDto> = await this.userService.findUserByPhone({ phone: body.phone })
    const userList = user_db.data
    let user: FindUserDto

    if (userList.length) {
      //用户已注册
      user = user_db.data[0]
      user.role = role

      request.session.login = true
      request.session.session_role = role
      request.session.phone = user.phone
      request.session.password = user.password
      request.session.user_id = user._id
      //修改登录态
    } else {
      //未注册
      //注册新用户
      this.userService.create({
        phone: body.phone,
        password: body.password,
        role,
        avatar:
          'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png',
        has_person_info: false,
      } as CreateUserDto)

      //重新请求用户数据
      const user_db: DbFindDate<FindUserDto> = await this.userService.findUserByPhone({ phone: body.phone })

      //用户数据
      user = user_db.data[0]
      user.role = role

      //修改登录态
      request.session.login = true
      request.session.session_role = role
      request.session.phone = user.phone
      request.session.password = user.password
      request.session.user_id = user._id
    }
    return {
      code: 1,
      msg: 'success',
      result: user,
    } as HttpRes<FindUserDto>
  }

  /**
   * 获取用户菜单
   * @param request
   * @returns
   */
  @Get('/menu')
  get_menu(@Req() request: Request) {
    const role = request.session.session_role || Role.STUDENT
    console.log(role)

    const userMenus = getMenuFactory(role)

    return {
      code: 1,
      msg: 'success',
      result: userMenus,
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
