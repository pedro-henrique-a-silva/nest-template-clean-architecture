import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { extraModelsToRegister } from '@docs/extra-models'
import SwaggerConfig from './config/swagger'

const httpsOptions = {
  key: process.env.SSL_KEY,
  cert: process.env.SSL_CERT,
  ca: process.env.SSL_CA,
}

async function bootstrap() {
  let app: any

  if (process.env.ACTIVATE_SSL_CERTIFICATE === 'YES') {
    app = await NestFactory.create(AppModule, { httpsOptions })
  } else {
    app = await NestFactory.create(AppModule)
  }

  app.setGlobalPrefix('api/v1')

  if (process.env.ACTIVATE_SWAGGER === 'YES') {
    const document = SwaggerModule.createDocument(app, SwaggerConfig, {
      extraModels: extraModelsToRegister,
    })
    SwaggerModule.setup('docs', app, document)
  }

  app.enableCors()
  app.use(helmet())

  await app.listen(process.env.PORT || 3001)
}
bootstrap()
