/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { BudgetRepository } from './budgets.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BudgetsController],
  providers: [BudgetsService, BudgetRepository, PrismaService]
})
export class BudgetsModule {}
