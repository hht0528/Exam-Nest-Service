import { FindSubjectDto } from 'src/subject/dto/create-subject.dto'

export type SubjectType = {
  firstName: string
  key: string
  id: string
  icon: string
  secondArr?: FindSubjectDto[]
}

export const firstSubject = [
  {
    firstName: '基础部分',
    key: 'Basics',
    id: '1',
    icon: 'https://exam-picture-1324151051.cos.ap-guangzhou.myqcloud.com/topic%2F%E5%9F%BA%E7%A1%80.png',
  },
  {
    firstName: '前端',
    key: 'Front-End',
    id: '2',
    icon: 'https://exam-picture-1324151051.cos.ap-guangzhou.myqcloud.com/topic%2FWEB%E5%89%8D%E7%AB%AF.png',
  },
  {
    firstName: '后端',
    key: 'Back-End ',
    id: '3',
    icon: 'https://exam-picture-1324151051.cos.ap-guangzhou.myqcloud.com/topic%2F%E5%90%8E%E7%AB%AF.png',
  },
  {
    firstName: '测试',
    key: 'Test',
    id: '4',
    icon: 'https://exam-picture-1324151051.cos.ap-guangzhou.myqcloud.com/topic%2F%E6%B5%8B%E8%AF%95.png',
  },
  {
    firstName: '基础必修',
    key: 'required',
    id: '5',
    icon: 'https://exam-picture-1324151051.cos.ap-guangzhou.myqcloud.com/topic%2F%E5%85%AC%E5%85%B1%E5%BF%85%E4%BF%AE.png',
  },
  {
    firstName: '公共选修',
    key: 'optional',
    id: '6',
    icon: 'https://exam-picture-1324151051.cos.ap-guangzhou.myqcloud.com/topic%2F%E5%A4%A7%E5%AD%A6%E5%9F%BA%E7%A1%80.png',
  },
]
