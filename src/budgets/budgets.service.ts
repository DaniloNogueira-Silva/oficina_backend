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

    async findById ( id: number ): Promise<any | null>
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

    async createPdf ( id: number ): Promise<any>
    {
        const budget = await this.findById( id );

        const agora = new Date();
        const hora = agora.getHours();
        const minutos = agora.getMinutes();

        const actualHour = `Hora atual: ${ hora }:${ minutos }`;

        // Calcula o total dos valores totais dos itens do orçamento
        const totalValue = budget.budgetItem.reduce( ( total, item ) =>
        {
            const itemValue = item.service ? item.service.value * item.quantity : item.product?.price * item.quantity;
            return total + itemValue;
        }, 0 );

        const itemsLength = budget.budgetItem.length

        const validade = new Date();
        validade.setDate( validade.getDate() + 5 );

        // DADOS DO ORÇAMENTO
        const data = {
            // Header
            numero_orcamento: budget.id,
            data: agora.toLocaleDateString( 'pt-BR' ), // Formata a data atual
            validade: validade.toLocaleDateString( 'pt-BR' ), // Formata a data de validade
            cliente: budget.client.name,
            endereco: budget.client.address,
            documento: budget.client.document,
            fone: budget.client.phone,
            hora: actualHour,

            veiculo: budget.client.vehicles[ 0 ].name,
            placa: budget.client.vehicles[ 0 ].plate,
            cidade: budget.client.vehicles[ 0 ].city,
            classe: budget.client.vehicles[ 0 ].name,
            cor: budget.client.vehicles[ 0 ].color,
            ano: budget.client.vehicles[ 0 ].year,

            // Itens do orçamento
            items: budget.budgetItem.map( item => ( {
                qtd: item.quantity,
                codigo: item.service ? item.service.code : item.product?.code,
                descricao: item.service ? item.service.description : item.product?.name,
                marca: item.service ? "Não tem" : item.product?.brand,
                valor: item.service ? item.service.value : item.product?.price,
                valor_total: item.service ? item.service.value * item.quantity : item.product?.price * item.quantity
            } ) ),

            // Total dos valores totais
            total: totalValue,
            totalItems: itemsLength
        };

        const options = {
            format: 'A4',
            margin: {
                left: '10mm',
                top: '0mm',
                right: '10mm',
                bottom: '15mm',
            },
            landscape: false,
        };

        const filePath = path.join( process.cwd(), 'templates', 'pdf-profile.hbs' );
        return createPdf( filePath, options, data );
    }

    async create ( data: any, clientId: number, totalService?: number, totalProduct?: number ): Promise<Budget>
    {
        try
        {
            return await this.budgetRepository.create( data, clientId, totalService, totalProduct );
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
