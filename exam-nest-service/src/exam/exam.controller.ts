import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common'
import { ExamService } from './exam.service'
import { CreateExamDto, FindExamDto, SearchParams } from './dto/create-exam.dto'
import { UpdateExamDto } from './dto/update-exam.dto'
import { Request } from 'express'
import { Role } from 'src/role/role.enum'
import { DbCreateData, DbDeleteData, DbFindData, DbUpdate } from 'src/db/type'
import { HttpRes } from 'src/types/httpRes'

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('/history')
  async getExamHistory(@Body() body, @Req() request: Request) {
    const role = request.session.session_role || 'admin'
    const user_id = request.session.user_id

    let findRes: DbFindData<FindExamDto>
    switch (role) {
      case Role.STUDENT:
        findRes = await this.examService.find({ ...body, student_id: user_id })
        break
      case Role.TEACHER:
        findRes = await this.examService.find({ ...body })
        break
    }

    return {
      code: 0,
      msg: 'success',
      result: findRes.data,
      count: findRes.count,
    } as HttpRes<FindExamDto[]>
  }

  //
  @Get(':examId')
  async findOne(@Param('examId') examId: string) {
    const findRes = await this.examService.find({ _id: examId } as SearchParams)
    return {
      code: 0,
      msg: 'success',
      result: findRes.data[0],
    } as HttpRes<FindExamDto>
  }

  @Post('/search')
  async search(@Body() searchParams: SearchParams) {
    const searchRes: DbFindData<FindExamDto> = await this.examService.find(searchParams)

    return {
      code: 0,
      msg: 'success',
      result: searchRes.data,
    } as HttpRes<FindExamDto[]>
  }
  //学生提交答案
  @Post('/answer')
  async postAnswer(@Body() createExamDto: CreateExamDto, @Req() request: Request) {
    const user_id = request.session.user_id
    const res: DbCreateData = await this.examService.create({
      ...createExamDto,
      student_id: user_id,
    })

    return {
      code: 0,
      msg: 'success',
      result: res,
    } as HttpRes<DbCreateData>
  }

  //教师批阅
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateExamDto: UpdateExamDto, @Req() request: Request) {
    const teacher_id = request.session.user_id
    updateExamDto.teacher_id = teacher_id
    const res: DbUpdate = await this.examService.update(id, { ...updateExamDto })

    return {
      code: 0,
      msg: 'success',
      result: res,
    } as HttpRes<DbUpdate>
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res: DbDeleteData = await this.examService.remove(id)

    return {
      code: 0,
      msg: 'success',
      result: res,
    } as HttpRes<DbDeleteData>
  }
}
