export type DbType = {
  //连接数据库
  collection: (dec: string) => any
  //获取服务端时间
  serverDate: () => Date
}
