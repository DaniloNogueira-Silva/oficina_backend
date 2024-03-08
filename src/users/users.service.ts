/* eslint-disable prettier/prettier */

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService
{
    constructor ( private readonly userRepository: UserRepository ) { }

    async findById ( email: string ): Promise<User | null>
    {
        try
        {
            const user = await this.userRepository.findById( email );
            if ( !user )
            {
                throw new NotFoundException( `User with email ${ email } not found.` );
            }
            return user;
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find user: ${ error.message }` );
        }
    }

    async findAll (): Promise<User[]>
    {
        try
        {
            return await this.userRepository.findAll();
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find all users: ${ error.message }` );
        }
    }

    async create ( data: Prisma.UserCreateInput ): Promise<User>
    {
        try
        {
            return await this.userRepository.create( data );
        } catch ( error )
        {
            throw new BadRequestException( `Failed to create user: ${ error.message }` );
        }
    }

    async update ( params: { id: number; data: Prisma.UserUpdateInput } ): Promise<User>
    {
        try
        {
            const user = await this.userRepository.update( params );
            if ( !user )
            {
                throw new NotFoundException( `User with id ${ params.id } not found.` );
            }
            return user;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to update user: ${ error.message }` );
        }
    }

    async delete ( id: number ): Promise<User>
    {
        try
        {
            const user = await this.userRepository.delete( id );
            if ( !user )
            {
                throw new NotFoundException( `User with id ${ id } not found.` );
            }
            return user;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to delete user: ${ error.message }` );
        }
    }
}
