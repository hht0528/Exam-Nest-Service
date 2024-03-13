import { Database } from '@cloudbase/node-sdk'

export class Exam {
  topic_list: any[] // 题目列表
  sub_second_id: string // 二级课程类目id
  sub_second_name: string
  student_id: string //用户id
  is_judge: boolean // 是否批改
  _id: string
  student_name: string // 用户花名
  teacher_id: string
  teacher_name: string
  finishTime: Database.ServerDate
  judgeTime: Database.ServerDate
}
