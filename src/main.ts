import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet'
import { useContainer } from 'class-validator';

//TODO REVISAR QUE EL EMAIL UNIQUE DECORATOR PUEDA USARSE EN MAS SITIOS
//TODO REVISAR SI HAY ALGO QUE PUEDA HACER PARA LIMPIAR CODIGO
//TODO QUITAR COMMON MODULE
//TODO REVISAR QUE NO DEJE ERRORES
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(helmet())
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  await app.listen(3000);
}
bootstrap();
