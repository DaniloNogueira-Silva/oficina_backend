import { VehicleRepository } from './vehicles.repository';
import { Vehicle } from '@prisma/client';
export declare class VehiclesService {
    private readonly vehicleRepository;
    constructor(vehicleRepository: VehicleRepository);
    findById(id: number): Promise<Vehicle | null>;
    findAll(): Promise<Vehicle[]>;
    create(clientId: number, data: any): Promise<Vehicle>;
    update(params: {
        id: number;
        data: any;
    }): Promise<Vehicle>;
    delete(id: number): Promise<Vehicle>;
}
