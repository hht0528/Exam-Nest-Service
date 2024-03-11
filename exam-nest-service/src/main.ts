import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import { ValidationPipe } from '@nestjs/common'
//import { HttpExceptionFilter } from './filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //
  app.setGlobalPrefix('/exam/api')
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  )
  //使用自定义验证错误格式管道
  app.useGlobalPipes(new ValidationPipe())
  //app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000)
}
bootstrap()
