import { PrismaService } from 'src/prisma/prisma.service';
import { Budget } from '@prisma/client';
export declare class BudgetRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<any>;
    findAll(): Promise<Budget[]>;
    create(data: any[], clientId: number, totalService?: number, totalProduct?: number): Promise<Budget>;
    update(budgetId: number, data: any[]): Promise<Budget>;
    delete(id: number): Promise<Budget>;
}
