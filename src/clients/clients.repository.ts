/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Client, Prisma } from '@prisma/client';

@Injectable()
export class ClientRepository
{
    constructor ( private prisma: PrismaService ) { }

    async findById (id: number): Promise<Client>
    {
        const numberId = Number( id );
        return await this.prisma.client.findUnique({
            where: {
                id: numberId
            }
        });
    };


    async findAll (): Promise<Client[]>
    {
        return await this.prisma.client.findMany();
    };

    async create ( data: Prisma.ClientCreateInput ): Promise<Client>
    {

        return await this.prisma.client.create( {
            data: {
                name: data.name,
                phone: data.phone,
                address: data.address,
                document: data.document
            }
        } );
    };

    async update ( params: {
        id: number;
        data: Prisma.ClientUpdateInput;
    } ): Promise<Client>
    {
        const { id, data } = params;
        const numberId = Number( id );
        return await this.prisma.client.update( {
            data,
            where: {
                id: numberId
            },
        } );
    };

    async delete ( id: number ): Promise<Client>
    {
        const numberId = Number( id );
        return await this.prisma.client.delete( {
            where: {
                id: numberId
            },
        } );
    };
}