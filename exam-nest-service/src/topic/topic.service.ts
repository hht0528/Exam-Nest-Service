import { Injectable } from '@nestjs/common'
import { CreateTopicDto } from './dto/create-topic.dto'
import { UpdateTopicDto } from './dto/update-topic.dto'
import { DbService } from 'src/db/db.service'

@Injectable()
export class TopicService {
  constructor(private dbService: DbService) {}
  create(createTopicDto: CreateTopicDto) {
    return this.dbService.db.collection('exam_topic').add({
      ...createTopicDto,
      created: this.dbService.db.serverDate({ offset: 0 }),
    })
  }

  find(params: object) {
    return this.dbService.db.collection('exam_topic').where(params).get()
  }

  update(id: string, updateTopicDto: UpdateTopicDto) {
    return this.dbService.db.collection('exam_topic').doc(id).update(updateTopicDto)
  }
  remove(id: string) {
    return this.dbService.db.collection('exam_topic').doc(id).remove()
  }

  findAll(params: object) {
    return this.dbService.db.collection('exam_topic').where(params).count()
  }

  findOne(params: object) {
    return this.dbService.db.collection('exam_topic').where(params).get()
  }
}
