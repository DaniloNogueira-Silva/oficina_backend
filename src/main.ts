/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap ()
{
  const prisma = new PrismaService();
  const app = await NestFactory.create( AppModule );

  // Configuração do CORS
  app.enableCors( {
    origin: '*', // Permitir requisições de qualquer origem, você pode ajustar conforme necessário
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type,Authorization', // Headers permitidos
    preflightContinue: false,
    optionsSuccessStatus: 204,
  } );

  await app.listen( 3000 );
}
bootstrap();

