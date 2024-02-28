import { Injectable } from '@nestjs/common'
import { CreateUserDto, FindStudentDto, FindUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { DbService } from '../db/db.service'
import { Role } from 'src/role/role.enum'
import { DbFindCount, DbFindData } from 'src/db/type'

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
  findUser<T extends object>(params: T) {
    return this.dbService.db.collection('exam-user').where(params).get()
  }

  //修改用户信息
  update(id: string, updateUserDto: UpdateUserDto) {
    return this.dbService.db.collection('exam-user').doc(id).update(updateUserDto)
  }

  //删除用户
  remove(id: string) {
    return this.dbService.db.collection('exam-user').doc(id).remove()
  }

  //获取所有教师
  findAllTeacher() {
    return this.dbService.db.collection('exam-user').where({ role: 'teacher' }).get()
  }

  //搜索学生
  async findStudent(params: FindStudentDto) {
    //整理数据
    const find_params = {
      ...params,
      role: Role.STUDENT,
    }
    //查询数量不需要携带skip、limit
    delete find_params.skip
    delete find_params.limit
    //查询学生数量

    const count_res: DbFindCount = await this.dbService.db.collection('exam-user').where(find_params).count()
    const count = count_res.total

    //查询符合条件学生  有skip、limit
    const res: DbFindData<FindUserDto> = await this.dbService.db
      .collection('exam-user')
      .where(find_params)
      .skip(parseInt(params.skip) || 0)
      .limit(parseInt(params.limit) || 5)
      .get()
    res.count = count
    return res
  }
}
