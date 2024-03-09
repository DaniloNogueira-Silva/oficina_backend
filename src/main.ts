/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const prisma = new PrismaService();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
