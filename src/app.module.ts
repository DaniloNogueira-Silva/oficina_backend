/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { BudgetsModule } from './budgets/budgets.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule,
    BudgetsModule,
    VehiclesModule,
    ServicesModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
