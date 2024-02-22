import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto, LoginDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Role } from 'src/role/role.enum'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  user_login(@Body() body: LoginDto, @Req() requset: Request) {
    let role: Role
    const password = body.password
    switch (password) {
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

    return role
  }

  @Get()
  findAll() {
    return '111'
    // return this.userService.findAll()
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
