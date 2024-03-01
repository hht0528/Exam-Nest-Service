import { Database } from '@cloudbase/node-sdk'
import { Subject } from '../entities/subject.entity'
import { IsNotExists } from 'src/rules/is-no-exists-validate'

export class CreateSubjectDto {
  sub_first_key: string //  一级分类key
  sub_first_id: string
  @IsNotExists('subject', { message: '该考试学科已经存在' })
  sub_second_name: string // 二级分类名称
  can_exam?: boolean //是否有题目
  created?: Database.ServerDate
  finished?: boolean //是否完成
}

export class FindSubjectDto extends Subject {}
