import { Injectable } from '@nestjs/common'
import { DbService } from './db/db.service'

@Injectable()
export class AppService {
  constructor(private readonly dbService: DbService) {}
  getHello() {
    return this.dbService.db.collection('test_doc').get()
  }
}
