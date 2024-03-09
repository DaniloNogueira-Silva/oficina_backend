import { ServicesRepository } from './services.repository';
import { Services } from '@prisma/client';
export declare class ServicesService {
    private readonly servicesRepository;
    constructor(servicesRepository: ServicesRepository);
    findById(id: number): Promise<Services | null>;
    findAll(): Promise<Services[]>;
    create(data: any): Promise<Services>;
    update(params: {
        id: number;
        data: any;
    }): Promise<Services>;
    delete(id: number): Promise<Services>;
}
