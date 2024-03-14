/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Budget } from '@prisma/client';

@Injectable()
export class BudgetRepository
{
    constructor ( private prisma: PrismaService ) { }

    async findById ( id: number ): Promise<any>
    {
        const numberId = Number( id );
        return await this.prisma.budget.findUnique( {
            where: {
                id: numberId
            },
            include: {
                budgetItem: {
                    include: {
                        service: true,
                        product: true
                    }
                },
                client: {
                    include: {
                        vehicles: true
                    }
                }
            }
        } );
    };

    async findAll (): Promise<Budget[]>
    {
        return await this.prisma.budget.findMany( {
            include: {
                budgetItem: {
                    include: {
                        service: true,
                        product: true
                    }
                }
            }
        } );
    }

    async create ( data: any[], clientId: number ): Promise<Budget>
    {
        const createdBudget = await this.prisma.budget.create( {
            data: {
                clientId: clientId,
                totalValue: 0
            }
        } );

        let totalValue = 0;

        for ( const itemData of data )
        {
            let itemValue = 0;

            // Verifica se o item é um serviço ou produto
            if ( itemData.serviceId )
            {
                const service = await this.prisma.services.findUnique( {
                    where: { id: itemData.serviceId },
                } );

                if ( !service )
                {
                    throw new Error( `Serviço com ID ${ itemData.serviceId } não encontrado.` );
                }

                itemValue = service.value * itemData.quantity;
            } else if ( itemData.productId )
            {
                const product = await this.prisma.products.findUnique( {
                    where: { id: itemData.productId },
                } );

                if ( !product )
                {
                    throw new Error( `Produto com ID ${ itemData.productId } não encontrado.` );
                }

                itemValue = product.price * itemData.quantity;
            }

            totalValue += itemValue;

            await this.prisma.budgetItem.create( {
                data: {
                    quantity: itemData.quantity,
                    budgetId: createdBudget.id,
                    servicesId: itemData.serviceId || null,
                    productsId: itemData.productId || null,
                }
            } );
        }

        const updatedBudget = await this.prisma.budget.update( {
            where: { id: createdBudget.id },
            data: { totalValue }
        } );

        return updatedBudget;
    };

    async update ( budgetId: number, data: any[] ): Promise<Budget>
    {
        const existingBudget = await this.prisma.budget.findUnique( {
            where: { id: budgetId },
        } );

        if ( !existingBudget )
        {
            throw new Error( `Orçamento com ID ${ budgetId } não encontrado.` );
        }

        for ( const itemData of data )
        {
            const existingBudgetItem = await this.prisma.budgetItem.findFirst( {
                where: { id: itemData.id, budgetId },
            } );

            if ( !existingBudgetItem )
            {
                throw new Error( `Item do orçamento com ID ${ itemData.id } não encontrado neste orçamento.` );
            }

            await this.prisma.budgetItem.update( {
                where: { id: itemData.id },
                data: {
                    quantity: itemData.quantity,
                    servicesId: itemData.servicesId || null,
                    productsId: itemData.productsId || null,
                },
            } );
        }


        return this.prisma.budget.findUnique( {
            where: { id: budgetId },
        } );
    }


    async delete ( id: number ): Promise<Budget>
    {
        const numberId = Number( id );

        // Primeiro, remova os itens de orçamento associados a este orçamento
        await this.prisma.budgetItem.deleteMany( {
            where: {
                budgetId: numberId,
            },
        } );

        // Em seguida, exclua o próprio orçamento
        return await this.prisma.budget.delete( {
            where: {
                id: numberId,
            },
        } );
    }

}