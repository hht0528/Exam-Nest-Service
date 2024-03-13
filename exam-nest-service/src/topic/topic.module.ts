import { Module } from '@nestjs/common'
import { TopicService } from './topic.service'
import { TopicController } from './topic.controller'
import { SubjectService } from 'src/subject/subject.service'

@Module({
  controllers: [TopicController],
  providers: [TopicService, SubjectService],
})
export class TopicModule {}
