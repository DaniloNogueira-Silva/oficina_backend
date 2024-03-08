/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { User, Prisma } from '@prisma/client';

@Controller( 'user' )
export class UsersController
{
    constructor (
        private readonly userService: UserService
    ) { }

    @Get( ':email' )
    async findById ( @Param( 'email' ) email: string ): Promise<User | null>
    {

        const user = await this.userService.findByEmail( email );
        return user;

    }

    @Get()
    async findAll (): Promise<User[]>
    {
        const users = await this.userService.findAll();
        return users;

    }

    @Post()
    async create ( @Body() userData: Prisma.UserCreateInput ): Promise<User>
    {
        const user = await this.userService.create( userData );
        return user;

    }

    @Put( ':id' )
    async update ( @Param( 'id' ) id: number, @Body() userData: Prisma.UserUpdateInput ): Promise<User>
    {

        const user = await this.userService.update( { id, data: userData } );
        return user;

    }

    @Delete( ':id' )
    async delete ( @Param( 'id' ) id: number ): Promise<User>
    {

        const user = await this.userService.delete( id );
        return user;
    }

    @Post( '/login' )
    async login ( @Body() userData: any ): Promise<any>
    {
        const user = await this.userService.login( userData );
        return user;
    }
}
