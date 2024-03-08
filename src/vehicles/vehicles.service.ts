/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { VehicleRepository } from './vehicles.repository';
import { Vehicle } from '@prisma/client';

@Injectable()
export class VehiclesService
{
    constructor ( private readonly vehicleRepository: VehicleRepository ) { }

    async findById ( id: number ): Promise<Vehicle | null>
    {
        try
        {
            const vehicle = await this.vehicleRepository.findById( id );
            if ( !vehicle )
            {
                throw new NotFoundException( `Vehicle with email ${ id } not found.` );
            }
            return vehicle;
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find vehicle: ${ error.message }` );
        }
    }

    async findAll (): Promise<Vehicle[]>
    {
        try
        {
            return await this.vehicleRepository.findAll();
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find all vehicles: ${ error.message }` );
        }
    }

    async create ( clientId: number, data: any ): Promise<Vehicle>
    {
        try
        {
            return await this.vehicleRepository.create( clientId, data );
        } catch ( error )
        {
            throw new BadRequestException( `Failed to create vehicle: ${ error.message }` );
        }
    }

    async update ( params: { id: number; data: any } ): Promise<Vehicle>
    {
        try
        {
            const vehicle = await this.vehicleRepository.update( params );
            if ( !vehicle )
            {
                throw new NotFoundException( `Vehicle with id ${ params.id } not found.` );
            }
            return vehicle;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to update vehicle: ${ error.message }` );
        }
    }

    async delete ( id: number ): Promise<Vehicle>
    {
        try
        {
            const vehicle = await this.vehicleRepository.delete( id );
            if ( !vehicle )
            {
                throw new NotFoundException( `Vehicle with id ${ id } not found.` );
            }
            return vehicle;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to delete vehicle: ${ error.message }` );
        }
    }
}
