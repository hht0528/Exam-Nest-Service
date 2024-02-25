export type DbType = {
  //连接数据库
  collection: (dec: string) => any
  //获取服务端时间
  serverDate: (options: Record<string, number>) => Date
}

/**
 * 查找数据类型
 */
export type DbFindDate<T> = {
  data: T[]
  requestId?: string
  count?: number
}
