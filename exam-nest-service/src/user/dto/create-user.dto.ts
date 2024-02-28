import { PartialType, PickType } from '@nestjs/mapped-types'
import { IsNotEmpty, Validate, IsMobilePhone } from 'class-validator'
import { CanPassRule } from 'src/rules/can.pass.pipe'
import { Role } from 'src/role/role.enum'
import { UserType } from '../entities/user.entity'
import { Database } from '@cloudbase/node-sdk'
import { IsNotExists } from 'src/rules/is-no-exists-validate'

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

export class FindStudentDto {
  name?: string
  //@IsMobilePhone('zh-CN', {}, { message: '电话号码格式不正确' })
  phone?: string
  /**分页值 */
  skip?: string
  /**每页展示值 */
  limit?: string
}

export class createTeacherDto {
  @IsNotExists('exam-user', { message: '该教师已经存在' })
  phone: string
}
