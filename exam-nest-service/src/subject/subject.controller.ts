import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { SubjectService } from './subject.service'

import { UpdateSubjectDto } from './dto/update-subject.dto'
import { getSubjectFactory } from 'src/config/config'
import { CreateSubjectDto, FindSubjectDto } from './dto/create-subject.dto'
import { DbCreateData, DbFindData } from 'src/db/type'
import { HttpRes } from 'src/types/httpRes'
import { SubjectType } from 'src/config/configure/subject_config'
import { firstSubject } from 'src/config/configure/subject_config'
import { DbService } from 'src/db/db.service'

@Controller('subject')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
    private dbService: DbService,
  ) {}

  /**
   * 获取学科
   * @returns
   */
  @Get()
  async getAllSubject() {
    const res: DbFindData<FindSubjectDto> = await this.subjectService.find({})
    //将一级分类学科和二级分类科目合并为数组
    const data = getSubjectFactory(res.data)
    return {
      code: 1,
      msg: 'success',
      result: data,
    } as HttpRes<SubjectType[]>
  }
  /**
   * 获取一级学科
   * @returns
   */
  @Get('/firstSubject')
  findOne() {
    return {
      code: 1,
      msg: 'success',
      data: firstSubject,
    } as HttpRes<SubjectType[]>
  }

  @Post('/secondSubject')
  async create(@Body() createSubjectDto: CreateSubjectDto) {
    createSubjectDto = {
      ...createSubjectDto,
      finished: false,
      can_exam: false,
      created: this.dbService.db.serverDate({ offset: 0 }),
    }

    const createRes: DbCreateData = await this.subjectService.create(createSubjectDto)
    console.log(createRes)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(+id, updateSubjectDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id)
  }
}
