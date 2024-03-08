import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { BudgetsModule } from './budgets/budgets.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule,
    BudgetsModule,
    VehiclesModule,
    ServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
