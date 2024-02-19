import * as tcb from '@cloudbase/node-sdk'
import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
@Injectable()
export class DbService {
  db
  constructor(private config: ConfigService) {
    console.log('数据库连接成功')

    const tcb_app = tcb.init({
      env: config.get('CLOUD_ENV'),
      secretId: config.get('CLOUD_SECRET_ID'),
      secretKey: config.get('CLOUD_SECRET_KEY'),
    })
    const db = tcb_app.database()
    this.db = db
  }
}
