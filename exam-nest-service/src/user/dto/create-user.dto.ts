import { PickType } from '@nestjs/mapped-types'
import { IsNotEmpty, Validate } from 'class-validator'
import { CanPassRule } from 'src/common/rules/can.pass.pipe'
import { Role } from 'src/role/role.enum'

export class CreateUserDto {
  @IsNotEmpty({ message: '号码不能为空' })
  phone: string
  @Validate(CanPassRule, { message: '密码不正确', context: { code: 400 } })
  password: string
  role: Role
  created: Date
  avatar: string
  has_person_info: boolean
}

export class LoginDto extends PickType(CreateUserDto, ['phone', 'password']) {}
