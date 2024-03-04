import { Database } from '@cloudbase/node-sdk'

export class Exam {
  topic_list: any[] // 题目列表
  sub_second_id: string // 二级课程类目id
  user_id: string //用户id
  is_judge: boolean // 是否批改
  _id: string
  created: Date // 考试时间
  user_name: string // 用户花名
  finishTime: Database.ServerDate
  judgeTime: Database.ServerDate
}
