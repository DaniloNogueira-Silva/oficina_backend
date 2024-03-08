import { PrismaService } from 'src/prisma/prisma.service';
import { Vehicle, Prisma } from '@prisma/client';
export declare class VehicleRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: number): Promise<Vehicle>;
    findAll(): Promise<Vehicle[]>;
    create(clientId: number, data: Prisma.VehicleCreateInput): Promise<Vehicle>;
    update(params: {
        id: number;
        data: any;
    }): Promise<Vehicle>;
    delete(id: number): Promise<Vehicle>;
}
