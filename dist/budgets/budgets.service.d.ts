import { BudgetRepository } from './budgets.repository';
import { Budget } from '@prisma/client';
import { VehicleRepository } from 'src/vehicles/vehicles.repository';
export declare class BudgetsService {
    private readonly budgetRepository;
    private readonly vehicleRepository;
    constructor(budgetRepository: BudgetRepository, vehicleRepository: VehicleRepository);
    findById(id: number): Promise<any | null>;
    findAll(): Promise<Budget[]>;
    createPdf(id: number): Promise<any>;
    create(data: any, clientId: number, validate: string, totalService?: number, totalProduct?: number, vehicleId?: number): Promise<Budget>;
    update(budgetId: number, data: any): Promise<Budget>;
    delete(id: number): Promise<Budget>;
}
