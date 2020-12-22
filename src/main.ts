import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix("v1")
  
  const options = new DocumentBuilder()
    .setTitle("Book api")
    .setDescription("Book API description")
    .setVersion("1.0")
    .addTag("Book API")
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup("api", app, document)
  await app.listen(3000);
}
bootstrap();
