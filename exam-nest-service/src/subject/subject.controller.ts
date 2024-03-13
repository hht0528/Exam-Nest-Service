import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { SubjectService } from './subject.service'

import { UpdateSubjectDto } from './dto/update-subject.dto'
import { getSubjectFactory } from 'src/config/config'
import { CreateSubjectDto, FindSubjectDto } from './dto/create-subject.dto'
import { DbCreateData, DbDeleteData, DbFindData, DbUpdate } from 'src/db/type'
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
      code: 0,
      msg: 'success',
      result: data,
    } as HttpRes<SubjectType[]>
  }
  /**
   * 获取一级学科
   * @returns
   */
  @Get('/first')
  findOne() {
    return {
      code: 0,
      msg: 'success',
      data: firstSubject,
    } as HttpRes<SubjectType[]>
  }
  /**
   * 添加二级考试学科
   * @param createSubjectDto
   */
  @Post('/second')
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
  /**
   * 修改二级学科
   * @param second_id
   * @param updateSubjectDto
   * @returns
   */
  @Patch('/second/:second_id')
  async update(@Param('second_id') second_id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    const res_update: DbUpdate = await this.subjectService.update(second_id, updateSubjectDto)
    return {
      code: 0,
      msg: 'success',
      result: res_update,
    } as HttpRes<DbUpdate>
  }
  /**
   * 删除二级学科
   * @param second_id
   * @returns
   */
  @Delete('/second/:second_id')
  async remove(@Param('second_id') second_id: string) {
    const res_delete: DbDeleteData = await this.subjectService.remove(second_id)
    return {
      code: 0,
      msg: 'success',
      result: res_delete,
    } as HttpRes<DbDeleteData>
  }
}
