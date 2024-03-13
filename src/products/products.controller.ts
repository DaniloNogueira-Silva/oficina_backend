/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma, Products } from '@prisma/client';

@Controller( 'product' )
export class ProductsController
{
    constructor ( private readonly productsService: ProductsService ) { }

    @Get( ':id' )
    async findById ( @Param( 'id' ) id: number ): Promise<Products | null>
    {

        const products = await this.productsService.findById( id );
        return products;

    };

    @Get()
    async findAll (): Promise<Products[]>
    {
        const productss = await this.productsService.findAll();
        return productss;

    };

    @Post()
    async create ( @Body() body: any ): Promise<Products>
    {
        const productsData = {
            name: body.name,
            brand: body.brand,
            price: body.value
        }
        const products = await this.productsService.create( productsData );
        return products;

    };

    @Put( ':id' )
    async update ( @Param( 'id' ) id: number, @Body() productsData: Prisma.ProductsUpdateInput ): Promise<Products>
    {

        const products = await this.productsService.update( { id, data: productsData } );
        return products;

    };

    @Delete( ':id' )
    async delete ( @Param( 'id' ) id: number ): Promise<Products>
    {

        const products = await this.productsService.delete( id );
        return products;
    };
}
