import { ClientsService } from './clients.service';
import { Client, Prisma } from '@prisma/client';
export declare class ClientsController {
    private readonly clientService;
    constructor(clientService: ClientsService);
    findById(id: number): Promise<Client | null>;
    findAll(): Promise<Client[]>;
    create(clientData: Prisma.ClientCreateInput): Promise<Client>;
    update(id: number, clientData: Prisma.ClientUpdateInput): Promise<Client>;
    delete(id: number): Promise<Client>;
}
