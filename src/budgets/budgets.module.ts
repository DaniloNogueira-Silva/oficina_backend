/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { BudgetRepository } from './budgets.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehicleRepository } from 'src/vehicles/vehicles.repository';

@Module({
  controllers: [BudgetsController],
  providers: [BudgetsService, BudgetRepository, PrismaService, VehicleRepository]
})
export class BudgetsModule {}
