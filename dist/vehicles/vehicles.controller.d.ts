import { VehiclesService } from './vehicles.service';
import { Prisma, Vehicle } from '@prisma/client';
export declare class VehiclesController {
    private readonly vehicleService;
    constructor(vehicleService: VehiclesService);
    findById(id: number): Promise<Vehicle | null>;
    findAll(): Promise<Vehicle[]>;
    create(body: any): Promise<Vehicle>;
    update(id: number, vehicleData: Prisma.VehicleUpdateInput): Promise<Vehicle>;
    delete(id: number): Promise<Vehicle>;
}
