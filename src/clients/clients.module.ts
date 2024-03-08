/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientRepository } from './clients.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, ClientRepository, PrismaService]
})
export class ClientsModule {}
