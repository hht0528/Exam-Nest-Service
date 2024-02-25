import { Injectable } from '@nestjs/common'
import { CreateUserDto, FindUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DbService } from '../db/db.service'

@Injectable()
export class UserService {
  constructor(private dbService: DbService) {}
  /**
   * 创建用户
   * @param createUserDto
   * @returns
   */
  create(createUserDto: CreateUserDto) {
    return this.dbService.db.collection('exam-user').add({
      ...createUserDto,
      topic_role: [],
      created: this.dbService.db.serverDate({ offset: 0 }),
    } as CreateUserDto)
  }
  /**
   * 查找用户表对应手机号码用户
   * @param phone
   * @returns
   */
  findUserByPhone<T extends object>(params: T) {
    return this.dbService.db.collection('exam-user').where(params).get()
  }

  findAll() {
    return `This action returns all user`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  login_state_assign(user: FindUserDto, session: Request) {}
}
