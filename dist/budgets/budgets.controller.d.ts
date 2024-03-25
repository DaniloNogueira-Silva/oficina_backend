import { BudgetsService } from './budgets.service';
import { Budget } from '@prisma/client';
export declare class BudgetsController {
    private readonly budgetService;
    constructor(budgetService: BudgetsService);
    findById(id: number): Promise<Budget | null>;
    findAll(): Promise<Budget[]>;
    create(budgetData: any): Promise<Budget>;
    update(id: number, budgetData: any): Promise<Budget>;
    delete(id: number): Promise<Budget>;
    generatePdf(id: number, res: any): Promise<any>;
}
