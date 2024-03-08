/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Prisma, Vehicle } from '@prisma/client';

@Controller( 'vehicle' )
export class VehiclesController
{
    constructor ( private readonly vehicleService: VehiclesService ) { }

    @Get( ':id' )
    async findById ( @Param( 'id' ) id: number ): Promise<Vehicle | null>
    {

        const vehicle = await this.vehicleService.findById( id );
        return vehicle;

    };

    @Get()
    async findAll (): Promise<Vehicle[]>
    {
        const vehicles = await this.vehicleService.findAll();
        return vehicles;

    };

    @Post()
    async create ( @Body() body: any ): Promise<Vehicle>
    {
        const clientId = body.clientId;
        const vehicleData = {
            name: body.name,
            plate: body.plate,
            color: body.color,
            year: body.year,
            city: body.city
        }
        const vehicle = await this.vehicleService.create( clientId, vehicleData );
        return vehicle;

    };

    @Put( ':id' )
    async update ( @Param( 'id' ) id: number, @Body() vehicleData: Prisma.VehicleUpdateInput ): Promise<Vehicle>
    {

        const vehicle = await this.vehicleService.update( { id, data: vehicleData } );
        return vehicle;

    };

    @Delete( ':id' )
    async delete ( @Param( 'id' ) id: number ): Promise<Vehicle>
    {

        const vehicle = await this.vehicleService.delete( id );
        return vehicle;
    };
}
