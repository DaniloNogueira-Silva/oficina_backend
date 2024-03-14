/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Products, Prisma } from '@prisma/client';

@Injectable()
export class ProductsRepository
{
    constructor ( private prisma: PrismaService ) { }

    async findById ( id: number ): Promise<Products>
    {
        const numberId = Number( id );
        return await this.prisma.products.findUnique( {
            where: {
                id: numberId
            }
        } );
    };


    async findAll (): Promise<Products[]>
    {
        return await this.prisma.products.findMany();
    };

    async create ( data: Prisma.ProductsCreateInput ): Promise<Products>
    {

        return await this.prisma.products.create( {
            data: {
                name: data.name,
                price: data.price,
                brand: data.brand,
                code: data.code
            }
        } );
    };

    async update ( params: {
        id: number;
        data: any;
    } ): Promise<Products>
    {
        const { id, data } = params;
        const numberId = Number( id );

        return await this.prisma.products.update( {
            data,
            where: {
                id: numberId
            },
        } );
    };

    async delete ( id: number ): Promise<Products>
    {
        const numberId = Number( id );
        return await this.prisma.products.delete( {
            where: {
                id: numberId
            },
        } );
    };
}