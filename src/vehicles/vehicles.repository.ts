/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Vehicle, Prisma } from '@prisma/client';

@Injectable()
export class VehicleRepository
{
    constructor ( private prisma: PrismaService ) { }

    async findById ( id: number ): Promise<Vehicle>
    {
        const numberId = Number( id );
        return await this.prisma.vehicle.findUnique( {
            where: {
                id: numberId
            }
        } );
    };


    async findAll (): Promise<Vehicle[]>
    {
        return await this.prisma.vehicle.findMany();
    };

    async create ( clientId: number, data: Prisma.VehicleCreateInput ): Promise<Vehicle>
    {

        const numberId = Number( clientId );
        return await this.prisma.vehicle.create( {
            data: {
                name: data.name,
                plate: data.plate,
                color: data.color,
                year: data.year,
                city: data.city,
                clientId: numberId,
            }
        } );
    };

    async update ( params: {
        id: number;
        data: any;
    } ): Promise<Vehicle>
    {
        const { id, data } = params;
        const numberId = Number( id );
        const numberClientId = Number( data.clientId );
        
        return await this.prisma.vehicle.update( {
            data: {
                name: data.name,
                plate: data.plate,
                color: data.color,
                year: data.year,
                city: data.city,
                clientId: numberClientId
            },
            where: {
                id: numberId
            },
        } );
    };

    async delete ( id: number ): Promise<Vehicle>
    {
        const numberId = Number( id );
        return await this.prisma.vehicle.delete( {
            where: {
                id: numberId
            },
        } );
    };
}