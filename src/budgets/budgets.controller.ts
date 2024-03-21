/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Put, Delete, Res, BadRequestException } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { Budget } from '@prisma/client';

@Controller( 'budget' )
export class BudgetsController
{
    constructor ( private readonly budgetService: BudgetsService ) { }

    @Get( ':id' )
    async findById ( @Param( 'id' ) id: number ): Promise<Budget | null>
    {

        const budget = await this.budgetService.findById( id );
        return budget;

    };

    @Get()
    async findAll (): Promise<Budget[]>
    {
        const budgets = await this.budgetService.findAll();
        return budgets;

    };

    @Post()
    async create ( @Body() budgetData: any ): Promise<Budget>
    {
        const clientId = budgetData.clientId;
        const budgetItems = budgetData.budgetItems;
        const budget = await this.budgetService.create( budgetItems, clientId );
        return budget;

    };

    @Put( ':id' )
    async update ( @Param( 'id' ) id: number, @Body() budgetData: any ): Promise<Budget>
    {

        const budget = await this.budgetService.update( id, budgetData );
        return budget;

    };

    @Delete( ':id' )
    async delete ( @Param( 'id' ) id: number ): Promise<Budget>
    {

        const budget = await this.budgetService.delete( id );
        return budget;
    };

    @Get( 'pdf/:id' )
    async generatePdf ( @Param( 'id' ) id: number, @Res() res ) 
    {
        try
        {
            const buffer = await this.budgetService.createPdf( id );
            res.set( {
                // pdf
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=pdf.pdf`,
                'Content-Length': buffer.length,
                // prevent cache
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                Pragma: 'no-cache',
                Expires: 0,
            } );
            res.end( buffer );
        } catch ( error )
        {
            throw new BadRequestException( `Falha ao gerar PDF: ${ error.message }` );
        }
    }
};
