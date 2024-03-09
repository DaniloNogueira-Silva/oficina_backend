/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Services, Prisma } from '@prisma/client';

@Injectable()
export class ServicesRepository
{
    constructor ( private prisma: PrismaService ) { }

    async findById ( id: number ): Promise<Services>
    {
        const numberId = Number( id );
        return await this.prisma.services.findUnique( {
            where: {
                id: numberId
            }
        } );
    };


    async findAll (): Promise<Services[]>
    {
        return await this.prisma.services.findMany();
    };

    async create (data: Prisma.ServicesCreateInput ): Promise<Services>
    {

        return await this.prisma.services.create( {
            data: {
                description: data.description,
                code: data.code,
                value: data.value,
            }
        } );
    };

    async update ( params: {
        id: number;
        data: any;
    } ): Promise<Services>
    {
        const { id, data } = params;
        const numberId = Number( id );

        return await this.prisma.services.update( {
            data,
            where: {
                id: numberId
            },
        } );
    };

    async delete ( id: number ): Promise<Services>
    {
        const numberId = Number( id );
        return await this.prisma.services.delete( {
            where: {
                id: numberId
            },
        } );
    };
}