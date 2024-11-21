import { DocumentBuilder } from '@nestjs/swagger'

export default new DocumentBuilder()
  .setTitle('API')
  .setDescription('API Rest')
  .setVersion('1.0')
  .addServer(process.env.APP_URL || 'http://localhost:3001')
  .addBearerAuth()
  .build()
