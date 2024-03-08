/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from './clients.repository';
import { Client, Prisma } from '@prisma/client';

@Injectable()
export class ClientsService
{
    constructor ( private readonly clientRepository: ClientRepository ) { }

    async findById ( id: number ): Promise<Client | null>
    {
        try
        {
            const client = await this.clientRepository.findById( id );
            if ( !client )
            {
                throw new NotFoundException( `Client with email ${ id } not found.` );
            }
            return client;
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find client: ${ error.message }` );
        }
    }

    async findAll (): Promise<Client[]>
    {
        try
        {
            return await this.clientRepository.findAll();
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find all clients: ${ error.message }` );
        }
    }

    async create ( data: Prisma.ClientCreateInput ): Promise<Client>
    {
        try
        {
            return await this.clientRepository.create( data );
        } catch ( error )
        {
            throw new BadRequestException( `Failed to create client: ${ error.message }` );
        }
    }

    async update ( params: { id: number; data: Prisma.ClientUpdateInput } ): Promise<Client>
    {
        try
        {
            const client = await this.clientRepository.update( params );
            if ( !client )
            {
                throw new NotFoundException( `Client with id ${ params.id } not found.` );
            }
            return client;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to update client: ${ error.message }` );
        }
    }

    async delete ( id: number ): Promise<Client>
    {
        try
        {
            const client = await this.clientRepository.delete( id );
            if ( !client )
            {
                throw new NotFoundException( `Client with id ${ id } not found.` );
            }
            return client;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to delete client: ${ error.message }` );
        }
    }
}
