export type DbType = {
  //连接数据库
  collection: (dec: string) => any
  //获取服务端时间
  serverDate: (options: Record<string, number>) => Date
}

/**
 * 查找数据类型
 */
export type DbFindData<T> = {
  data: T[]
  requestId?: string
  count?: number
}

export type DbUpdate = {
  updated?: number
  requestId?: string
}

export type DbDeleteData = {
  deleted?: integer
  requestId?: string
}

export type DbFindCount = {
  total?: number
  requestId?: string
}
