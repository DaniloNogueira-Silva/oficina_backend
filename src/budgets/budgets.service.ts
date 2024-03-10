/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BudgetRepository } from './budgets.repository';
import { Budget } from '@prisma/client';
import { createPdf } from '@saemhco/nestjs-html-pdf';
import * as path from 'path';

@Injectable()
export class BudgetsService
{
    constructor ( private readonly budgetRepository: BudgetRepository ) { }

    async findById ( id: number ): Promise<Budget | null>
    {
        try
        {
            const budget = await this.budgetRepository.findById( id );
            if ( !budget )
            {
                throw new NotFoundException( `Budget with id ${ id } not found.` );
            }
            return budget;
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find budget: ${ error.message }` );
        }
    }

    async findAll (): Promise<Budget[]>
    {
        try
        {
            return await this.budgetRepository.findAll();
        } catch ( error )
        {
            throw new NotFoundException( `Failed to find all budgets: ${ error.message }` );
        }
    }

    async createPdf (id: number): Promise<any>
    {
        const budget = await this.findById(id);
        console.log(budget);
        const filePath = path.join( process.cwd(), 'templates', 'pdf-profile.hbs' );
        console.log(filePath);
        return createPdf( filePath );
    }

    async create ( data: any ): Promise<Budget>
    {
        try
        {
            return await this.budgetRepository.create( data );
        } catch ( error )
        {
            throw new BadRequestException( `Failed to create budget: ${ error.message }` );
        }
    }

    async update ( budgetId: number, data: any ): Promise<Budget>
    {
        try
        {
            const budget = await this.budgetRepository.update( budgetId, data );
            if ( !budget )
            {
                throw new NotFoundException( `Budget with id ${ budgetId } not found.` );
            }
            return budget;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to update budget: ${ error.message }` );
        }
    }

    async delete ( id: number ): Promise<Budget>
    {
        try
        {
            const budget = await this.budgetRepository.delete( id );
            if ( !budget )
            {
                throw new NotFoundException( `Budget with id ${ id } not found.` );
            }
            return budget;
        } catch ( error )
        {
            throw new BadRequestException( `Failed to delete budget: ${ error.message }` );
        }
    }
}
