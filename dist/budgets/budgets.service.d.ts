import { BudgetRepository } from './budgets.repository';
import { Budget } from '@prisma/client';
export declare class BudgetsService {
    private readonly budgetRepository;
    constructor(budgetRepository: BudgetRepository);
    findById(id: number): Promise<any | null>;
    findAll(): Promise<Budget[]>;
    createPdf(id: number): Promise<any>;
    create(data: any, clientId: number, validate: string, totalService?: number, totalProduct?: number): Promise<Budget>;
    update(budgetId: number, data: any): Promise<Budget>;
    delete(id: number): Promise<Budget>;
}
