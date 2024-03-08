/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Client, Prisma } from '@prisma/client';

@Controller( 'client' )
export class ClientsController
{
    constructor ( private readonly clientService: ClientsService ) { }

    @Get( ':id' )
    async findById ( @Param( 'id' ) id: number ): Promise<Client | null>
    {

        const client = await this.clientService.findById( id );
        return client;

    };

    @Get()
    async findAll (): Promise<Client[]>
    {
        const clients = await this.clientService.findAll();
        return clients;

    };

    @Post()
    async create ( @Body() clientData: Prisma.ClientCreateInput ): Promise<Client>
    {
        const client = await this.clientService.create( clientData );
        return client;

    };

    @Put( ':id' )
    async update ( @Param( 'id' ) id: number, @Body() clientData: Prisma.ClientUpdateInput ): Promise<Client>
    {

        const client = await this.clientService.update( { id, data: clientData } );
        return client;

    };

    @Delete( ':id' )
    async delete ( @Param( 'id' ) id: number ): Promise<Client>
    {

        const client = await this.clientService.delete( id );
        return client;
    };
};
