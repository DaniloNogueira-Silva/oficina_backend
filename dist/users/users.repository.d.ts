import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(data: any): Promise<User>;
    update(params: {
        id: number;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    delete(id: number): Promise<User>;
}
