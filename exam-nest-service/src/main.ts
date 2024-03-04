import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as session from 'express-session'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('/exam/api')
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  )

  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap()
