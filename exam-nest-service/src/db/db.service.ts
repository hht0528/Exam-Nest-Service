import * as tcb from '@cloudbase/node-sdk'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

@Injectable()
export class DbService {
  db: tcb.Database.Db
  constructor(private config: ConfigService) {
    console.log('数据库连接成功')
    const tcb_app = tcb.init({
      env: this.config.get<string>('CLOUD_ENV'),
      secretId: this.config.get<string>('CLOUD_SECRET_ID'),
      secretKey: this.config.get('CLOUD_SECRET_KEY'),
      region: this.config.get('CLOUD_REGION'),
    })
    const db = tcb_app.database()
    this.db = db
  }
}
