import { PartialType } from '@nestjs/mapped-types'

import { Exam } from '../entities/exam.entity'

export class UpdateExamDto extends PartialType(Exam) {}
