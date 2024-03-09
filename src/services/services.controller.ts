/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Prisma, Services } from '@prisma/client';

@Controller( 'service' )
export class ServicesController
{
    constructor ( private readonly servicesService: ServicesService ) { }

    @Get( ':id' )
    async findById ( @Param( 'id' ) id: number ): Promise<Services | null>
    {

        const services = await this.servicesService.findById( id );
        return services;

    };

    @Get()
    async findAll (): Promise<Services[]>
    {
        const servicess = await this.servicesService.findAll();
        return servicess;

    };

    @Post()
    async create ( @Body() body: any ): Promise<Services>
    {
        const servicesData = {
            description: body.description,
            code: body.code,
            value: body.value
        }
        const services = await this.servicesService.create( servicesData );
        return services;

    };

    @Put( ':id' )
    async update ( @Param( 'id' ) id: number, @Body() servicesData: Prisma.ServicesUpdateInput ): Promise<Services>
    {

        const services = await this.servicesService.update( { id, data: servicesData } );
        return services;

    };

    @Delete( ':id' )
    async delete ( @Param( 'id' ) id: number ): Promise<Services>
    {

        const services = await this.servicesService.delete( id );
        return services;
    };
}
