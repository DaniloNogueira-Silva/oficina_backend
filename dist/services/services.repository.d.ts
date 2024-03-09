import { PrismaService } from 'src/prisma/prisma.service';
import { Services, Prisma } from '@prisma/client';
export declare class ServicesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<Services>;
    findAll(): Promise<Services[]>;
    create(data: Prisma.ServicesCreateInput): Promise<Services>;
    update(params: {
        id: number;
        data: any;
    }): Promise<Services>;
    delete(id: number): Promise<Services>;
}
