import { Exam } from '../entities/exam.entity'
import { OmitType } from '@nestjs/mapped-types'

export class CreateExamDto extends OmitType(Exam, ['judgeTime', 'teacher_id', 'teacher_name']) {}

export class SearchParams {
  limit?: number
  skip?: number
  user_id?: string
  subSecondId?: string
  _id: string
}

export class FindExamDto extends Exam {}
