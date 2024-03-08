/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { UserRepository } from './users.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UserService, UserRepository, PrismaService]
})
export class UsersModule {}
