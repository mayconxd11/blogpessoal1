import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal') //Titulo
  .setDescription('Projeto Blog Pessoal') //descrição
  .setContact('Generation Brasil', 'http://www.generationbrasil.online', 'generation@gmail.com') //contatos
  .setVersion('1.0') // Versão
  .addBearerAuth() //modole de token do sistema
  .build(); //ela vai pegar as configurações que passamos acima e irá retornar tudo para as config
  const document = SwaggerModule.createDocument (app, config);
  SwaggerModule.setup('/swagger', app,document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
