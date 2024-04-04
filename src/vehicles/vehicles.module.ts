/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { VehicleRepository } from './vehicles.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VehiclesController],
  providers: [VehiclesService, PrismaService, VehicleRepository],
  exports: [VehicleRepository]
})
export class VehiclesModule {}
