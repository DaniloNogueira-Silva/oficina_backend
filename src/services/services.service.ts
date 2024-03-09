/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ServicesRepository } from './services.repository';
import { Services } from '@prisma/client';

@Injectable()
export class ServicesService
{
    constructor ( private readonly servicesRepository: ServicesRepository ) { }

    async findById ( id: number ): Promise<Services | null>
    {
        try
        {
            const services = await this.servicesRepository.findById( id );
            if ( !services )
            {
                throw new NotFoundException( `Services with email ${ id } not found.` );
            }
            return services;
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find services: ${ error.message }` );
        }
    }

    async findAll (): Promise<Services[]>
    {
        try
        {
            return await this.servicesRepository.findAll();
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find all servicess: ${ error.message }` );
        }
    }

    async create ( data: any ): Promise<Services>
    {
        try
        {
            return await this.servicesRepository.create( data );
        } catch ( error )
        {
            throw new BadRequestException( `Failed to create services: ${ error.message }` );
        }
    }

    async update ( params: { id: number; data: any } ): Promise<Services>
    {
        try
        {
            const services = await this.servicesRepository.update( params );
            if ( !services )
            {
                throw new NotFoundException( `Services with id ${ params.id } not found.` );
            }
            return services;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to update services: ${ error.message }` );
        }
    }

    async delete ( id: number ): Promise<Services>
    {
        try
        {
            const services = await this.servicesRepository.delete( id );
            if ( !services )
            {
                throw new NotFoundException( `Services with id ${ id } not found.` );
            }
            return services;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to delete services: ${ error.message }` );
        }
    }
}
