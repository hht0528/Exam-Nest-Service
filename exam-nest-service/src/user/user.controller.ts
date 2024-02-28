import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, FindStudentDto, FindUserDto, LoginDto, createTeacherDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Role } from 'src/role/role.enum'
import { DbDeleteData, DbFindData, DbUpdate } from 'src/db/type'
import { Request } from 'express'
import { HttpRes } from 'src/types/httpRes'
import { getMenuFactory } from 'src/config/config'
import { Roles } from 'src/role/role.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 用户登录
   * @param body
   * @param request
   * @returns
   */
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

    const user_db: DbFindData<FindUserDto> = await this.userService.findUser({ phone: body.phone })
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
      const user_db: DbFindData<FindUserDto> = await this.userService.findUser({ phone: body.phone })

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
   * 退出登录
   * @param request
   * @returns
   */
  @Post('/logout')
  user_logout(@Req() request: Request) {
    //修改用户登录态
    request.session.login = false
    request.session.phone = null
    request.session.password = null
    request.session.user_id = null
    request.session.session_role = null

    return {
      code: 1,
      msg: 'success',
    }
  }

  /**
   * 获取用户菜单
   * @param request
   * @returns
   */
  @Get('/menu')
  get_menu(@Req() request: Request) {
    const role = request.session.session_role || Role.STUDENT

    const userMenus = getMenuFactory(role)

    return {
      code: 1,
      msg: 'success',
      result: userMenus,
    }
  }

  /**
   * 获取用户信息
   * @param request
   * @returns
   */
  @Get()
  async getUserInfo(@Req() request: Request) {
    //获取用户登录后的用户id
    const user_id = request.session.user_id
    const user_db: DbFindData<FindUserDto> = await this.userService.findUser({ _id: user_id } as FindUserDto)
    const user = user_db.data[0]
    user.role = request.session.session_role
    return {
      code: 1,
      msg: 'success',
      result: user,
    }
  }

  /**
   * 修改用户信息
   * @param id
   * @param updateUserDto
   * @returns
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res: DbUpdate = await this.userService.update(id, { ...updateUserDto, has_person_info: true })
    return {
      code: 1,
      msg: 'success',
      result: res,
    } as HttpRes<DbUpdate>
  }

  /**
   * 删除用户
   * @param id
   * @returns
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res: DbDeleteData = await this.userService.remove(id)

    return {
      code: 1,
      msg: 'success',
      result: res,
      count: res.deleted,
    } as HttpRes<DbDeleteData>
  }

  /**
   *搜索学生
   * 教师权限
   */
  @Get('/student')
  @Roles(Role.TEACHER)
  async findStudent(@Query() params: FindStudentDto) {
    const res = await this.userService.findStudent(params)
    return {
      result: res,
    }
  }
  /**
   * 获取所有教师
   */
  @Get('/teacher')
  async findAllTeacher() {
    const res: DbFindData<FindUserDto> = await this.userService.findAllTeacher()
    return {
      code: 1,
      msg: 'success',
      result: res.data,
    } as HttpRes<FindUserDto>
  }
  /**
   * 新增教师
   */

  @Post('/addTeacher')
  async addTeacher(@Body() body: createTeacherDto) {
    const phone = body.phone
    const res: DbFindData<FindUserDto> = await this.userService.findUser({ phone })
    //如果用户存在且role不是teacher
    if (res.data.length) {
      const { _id } = res.data[0]
      await this.userService.update(_id, { role: Role.TEACHER })
    } else {
      await this.userService.create({
        phone,
        password: '222222',
        role: Role.TEACHER,
        avatar:
          'http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-46e7-abb8-659448c33081.png',
        has_person_info: false,
      })
    }

    return {
      code: 1,
      msg: 'success',
    }
  }
}
