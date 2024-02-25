import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DbModule } from './db/db.module'
import { UserModule } from './user/user.module'
import { TopicModule } from './topic/topic.module'
import { SubjectModule } from './subject/subject.module'
import { ExamModule } from './exam/exam.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TopicModule,
    SubjectModule,
    ExamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
