import { ClientRepository } from './clients.repository';
import { Client, Prisma } from '@prisma/client';
export declare class ClientsService {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository);
    findById(id: number): Promise<Client | null>;
    findAll(): Promise<Client[]>;
    create(data: Prisma.ClientCreateInput): Promise<Client>;
    update(params: {
        id: number;
        data: Prisma.ClientUpdateInput;
    }): Promise<Client>;
    delete(id: number): Promise<Client>;
}
