import { Database } from '@cloudbase/node-sdk'
export class Topic {
  sub_second_id: string // 二级课程分类id
  topic_title: string // 题目题目
  topic_dec: string // 题目描述
  topic_img: string // 图片地址
  _id: string
  created: Database.ServerDate // 创建时间
}
