type RouterDataType = typeof routersData
export type RouterKeys = keyof RouterDataType

export const routersData = {
  //公共路由
  login: {
    // 页面1  登录
    path: '/login',
    hasMenu: false,
  },
  person_info: {
    // 页面2： 个人信息录入（学生 教师）
    path: '/person_info',
    hasMenu: false,
  },

  //学生路由
  exam_select: {
    // 页面3： 考题选择 （学生）
    path: '/exam_select',
    hasMenu: true,
  },
  exam: {
    // 页面4： 考试 (学生)
    path: '/exam/:exam_id',
    hasMenu: true,
  },
  exam_history: {
    //页面5： 学生考试记录 （学生）
    path: '/exam_history',
    hasMenu: true,
  },
  read_exam: {
    // 页面6 查看试卷（学生 教师）
    path: '/read_exam/:exam_id',
    hasMenu: true,
  },

  //教师路由
  correct_exam_list: {
    // 页面7： 批阅试卷列表（教师）
    path: '/correct_exam_list',
    hasMenu: true,
  },
  correct_exam: {
    // 页面8： 批改试卷（老师）
    path: '/correct_exam/:exam_id',
    hasMenu: true,
  },
  student_manage: {
    //页面9： 学生管理(教师)
    path: '/student_manage',
    hasMenu: true,
  },
  subject_manage: {
    // 页面10： 课程管理 （教师）
    path: '/subject_manage',
    hasMenu: true,
  },
  subject_add: {
    // 页面11： 考题录入（教师）
    path: '/subject_add',
    hasMenu: true,
  },

  //管理员路由
  admin_manage: {
    //页面12： 管理员管理
    path: '/teacher_manage',
    hasMenu: true,
  },
}

export const studentMenus = [
  {
    label: '考题选择',
    key: 'exam_select',
  },
  {
    label: '考试记录',
    key: 'exam_history',
  },
]

export const teacherMenus = [
  {
    label: '阅卷列表',
    key: 'correct_exam_list',
  },
  {
    label: '考题管理',
    key: 'subject_add',
  },
  {
    label: '课程管理',
    key: 'subject_manage',
  },
  {
    label: '学员管理',
    key: 'student_manage',
  },
]

export const adminMenus = [
  {
    label: '阅卷列表',
    key: 'correct_exam_list',
  },
  {
    label: '考题管理',
    key: 'subject_add',
  },
  {
    label: '课程管理',
    key: 'subject_manage',
  },
  {
    label: '学员管理',
    key: 'student_manage',
  },
  {
    label: '教师管理',
    key: 'teacher_manage',
  },
]
