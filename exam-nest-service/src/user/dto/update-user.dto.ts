import { PartialType } from '@nestjs/mapped-types'

import { UserType } from '../entities/user.entity'

export class UpdateUserDto extends PartialType(UserType) {}
