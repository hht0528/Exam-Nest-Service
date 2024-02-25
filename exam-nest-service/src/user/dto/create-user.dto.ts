import { PartialType, PickType } from '@nestjs/mapped-types'
import { IsNotEmpty, Validate } from 'class-validator'
import { CanPassRule } from 'src/common/rules/can.pass.pipe'
import { Role } from 'src/role/role.enum'
import { UserType } from '../entities/user.entity'
import { Database } from '@cloudbase/node-sdk'

export class CreateUserDto {
  @IsNotEmpty({ message: '号码不能为空' })
  phone: string
  @Validate(CanPassRule, { message: '密码不正确' })
  password: string
  role: Role
  created?: Database.ServerDate
  avatar: string
  has_person_info: boolean
  topic_role?: string[]
}

export class LoginDto extends PickType(CreateUserDto, ['phone', 'password']) {}

export class FindUserDto extends PartialType(UserType) {}
