export class UserType {
  created: Date // 时间
  name: string // 学生花名
  vChat: string // 微信名字
  phone: string // 手机
  password: string //密码
  avatar: string // 头像
  role: string // 角色
  _id: string
  has_person_info: boolean // 是否填写个人信息
  topic_role: string[]
  specialty: string // 专业
  class: string // 班级
}
