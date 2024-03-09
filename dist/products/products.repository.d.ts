import { PrismaService } from 'src/prisma/prisma.service';
import { Products, Prisma } from '@prisma/client';
export declare class ProductsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<Products>;
    findAll(): Promise<Products[]>;
    create(data: Prisma.ProductsCreateInput): Promise<Products>;
    update(params: {
        id: number;
        data: any;
    }): Promise<Products>;
    delete(id: number): Promise<Products>;
}
