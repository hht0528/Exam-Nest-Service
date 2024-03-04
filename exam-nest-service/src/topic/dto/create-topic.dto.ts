import { Database } from '@cloudbase/node-sdk'

export class CreateTopicDto {
  sub_second_id: string // 二级课程分类id
  topic_title: string // 题目题目
  topic_dec: string // 题目描述
  topic_img?: string // 图片地址
  _id: string
  topic_headline: string //试卷标题
  created: Database.ServerDate // 创建时间
  deadline: Database.ServerDate //考试截止时间
}

export class FindTopicDto extends CreateTopicDto {}
