import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import 'reflect-metadata'

import { AppModule } from './app.module'
import { TransformInterceptor } from './plain.transformer'
import './routes'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new ValidationPipe())

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000

  const config = new DocumentBuilder()
    .setTitle('Backend')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addServer(`http://localhost:${port}`)
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
}
bootstrap()
