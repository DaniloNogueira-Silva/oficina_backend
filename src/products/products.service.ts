/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from '@prisma/client';

@Injectable()
export class ProductsService
{
    constructor ( private readonly productsRepository: ProductsRepository ) { }

    async findById ( id: number ): Promise<Products | null>
    {
        try
        {
            const products = await this.productsRepository.findById( id );
            if ( !products )
            {
                throw new NotFoundException( `Products with id ${ id } not found.` );
            }
            return products;
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find products: ${ error.message }` );
        }
    }

    async findAll (): Promise<Products[]>
    {
        try
        {
            return await this.productsRepository.findAll();
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find all productss: ${ error.message }` );
        }
    }

    async create ( data: any ): Promise<Products>
    {
        try
        {
            return await this.productsRepository.create( data );
        } catch ( error )
        {
            throw new BadRequestException( `Failed to create products: ${ error.message }` );
        }
    }

    async update ( params: { id: number; data: any } ): Promise<Products>
    {
        try
        {
            const products = await this.productsRepository.update( params );
            if ( !products )
            {
                throw new NotFoundException( `Products with id ${ params.id } not found.` );
            }
            return products;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to update products: ${ error.message }` );
        }
    }

    async delete ( id: number ): Promise<Products>
    {
        try
        {
            const products = await this.productsRepository.delete( id );
            if ( !products )
            {
                throw new NotFoundException( `Products with id ${ id } not found.` );
            }
            return products;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to delete products: ${ error.message }` );
        }
    }
}
