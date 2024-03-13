import { Injectable } from '@nestjs/common'
import { CreateExamDto, FindExamDto, SearchParams } from './dto/create-exam.dto'
import { UpdateExamDto } from './dto/update-exam.dto'
import { DbService } from 'src/db/db.service'
import { DbFindCount, DbFindData } from 'src/db/type'
import { UserService } from 'src/user/user.service'
import { FindUserDto } from '../user/dto/create-user.dto'
import { FindSubjectDto } from 'src/subject/dto/create-subject.dto'
import { SubjectService } from '../subject/subject.service'

@Injectable()
export class ExamService {
  constructor(
    private dbService: DbService,
    private userService: UserService,
    private subjectService: SubjectService,
  ) {}
  async create(data: CreateExamDto) {
    //先查找学生信息
    const user_data: DbFindData<FindUserDto> = await this.userService.findUser({ _id: data.student_id })
    data.student_name = user_data.data[0].name

    //再查找二级学科名
    const subject_data: DbFindData<FindSubjectDto> = await this.subjectService.find({ _id: data.sub_second_id })
    data.sub_second_name = subject_data.data[0].sub_second_name

    //整理数据
    data.is_judge = false
    data.finishTime = this.dbService.db.serverDate({ offset: 0 })
    return this.dbService.db.collection('exam').add({
      ...data,
    })
  }

  async find(params: SearchParams) {
    const searchParams = {
      ...params,
    }

    delete searchParams.limit
    delete searchParams.skip

    //查找数量
    const findCountRes: DbFindCount = await this.dbService.db.collection('exam').where(searchParams).count()
    const total = findCountRes.total

    const findExamRes: DbFindData<FindExamDto> = await this.dbService.db
      .collection('exam')
      .where(searchParams)
      .limit(params.limit || 0)
      .skip(params.skip || 10)
      .get()

    findExamRes.count = total

    return findExamRes
  }

  async update(id: string, updateExamDto: UpdateExamDto) {
    //先查找教师用户
    const { teacher_id } = updateExamDto
    const user_data: DbFindData<FindUserDto> = await this.userService.findUser({ _id: teacher_id })

    updateExamDto.teacher_name = user_data.data[0].name
    updateExamDto.is_judge = true
    updateExamDto.judgeTime = this.dbService.db.serverDate({ offset: 0 })
    return this.dbService.db.collection('exam').doc(id).update(updateExamDto)
  }

  remove(id: string) {
    return this.dbService.db.collection('exam').doc(id).remove()
  }
}
