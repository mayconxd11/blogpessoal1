import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')      //Titulo
  .setDescription('Projeto Blog Pessoal') //descrição
  .setContact('Generation Brasil', 'http://www.generationbrasil.online', 'generation@gmail.com') //contatos
  .setVersion('1.0') // Versão
  .build();

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
