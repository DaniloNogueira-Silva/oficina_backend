import { ServicesService } from './services.service';
import { Prisma, Services } from '@prisma/client';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
    findById(id: number): Promise<Services | null>;
    findAll(): Promise<Services[]>;
    create(body: any): Promise<Services>;
    update(id: number, servicesData: Prisma.ServicesUpdateInput): Promise<Services>;
    delete(id: number): Promise<Services>;
}
