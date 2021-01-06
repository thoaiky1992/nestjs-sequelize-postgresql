import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { RedisIoAdapter } from './library/socket.io/socket.io.adapter';
import { NestLogger } from './library/logger/logger';
config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new NestLogger(),
  });
  app.useWebSocketAdapter(new RedisIoAdapter(app))
  app.enableCors();
  app.use(cookieParser(process.env.MAIN_JWT_TOKEN || 'thoaiky1992'))
  

  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API Swagger')
    .setDescription('The API description')  
    .setVersion('1.0')
    .addTag('Nestjs-Sequelize-postgresql')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.MAIN_APP_PORT);
}
bootstrap();
