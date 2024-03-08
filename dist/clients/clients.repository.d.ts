import { PrismaService } from 'src/prisma/prisma.service';
import { Client, Prisma } from '@prisma/client';
export declare class ClientRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<Client>;
    findAll(): Promise<Client[]>;
    create(data: Prisma.ClientCreateInput): Promise<Client>;
    update(params: {
        id: number;
        data: Prisma.ClientUpdateInput;
    }): Promise<Client>;
    delete(id: number): Promise<Client>;
}
