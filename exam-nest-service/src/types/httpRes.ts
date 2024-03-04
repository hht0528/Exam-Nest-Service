//返回前端数据类型
export interface HttpRes<T> {
  code: 0 | 1 //1 成功  0 失败
  msg: 'success' | 'fail'
  result?: T
  count?: number
}
