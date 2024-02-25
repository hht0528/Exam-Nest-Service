import session from 'express-session'
import { Role } from './role/role.enum'

//定义session数据
declare module 'express-session' {
  export interface SessionData {
    session_role: Role
    user_id: string
    login: boolean
    phone: string
    password: string
  }
}
