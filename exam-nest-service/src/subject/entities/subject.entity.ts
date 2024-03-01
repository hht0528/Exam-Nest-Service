import { Database } from '@cloudbase/node-sdk'

export class Subject {
  sub_first_key: string //  一级分类key
  sub_first_id: string
  sub_second_name: string // 二级分类名称
  can_exam: boolean //是否有题目
  _id: string
  created: Database.ServerDate
  finished: boolean //是否完成
}
