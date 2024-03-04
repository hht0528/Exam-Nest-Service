import { FindSubjectDto } from 'src/subject/dto/create-subject.dto'

export type SubjectType = {
  firstName: string
  key: string
  id: string
  secondArr?: FindSubjectDto[]
}

export const firstSubject = [
  {
    firstName: '基础部分',
    key: 'Basics',
    id: '1',
  },
  {
    firstName: '前端',
    key: 'Front-End',
    id: '2',
  },
  {
    firstName: '后端',
    key: 'Back-End ',
    id: '3',
  },
  {
    firstName: '测试',
    key: 'Test',
    id: '4',
  },
  {
    firstName: '基础必修',
    key: 'required',
    id: '5',
  },
  {
    firstName: '公共选修',
    key: 'optional',
    id: '6',
  },
]
