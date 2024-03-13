"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BudgetRepository = class BudgetRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const numberId = Number(id);
        return await this.prisma.budget.findUnique({
            where: {
                id: numberId
            },
            include: {
                budgetItem: {
                    include: {
                        service: true,
                        product: true
                    }
                }
            }
        });
    }
    ;
    async findAll() {
        return await this.prisma.budget.findMany({
            include: {
                budgetItem: {
                    include: {
                        service: true,
                        product: true
                    }
                }
            }
        });
    }
    async create(data, clientId) {
        const createdBudget = await this.prisma.budget.create({
            data: {
                clientId: clientId,
                totalValue: 0
            }
        });
        let totalValue = 0;
        for (const itemData of data) {
            let itemValue = 0;
            if (itemData.serviceId) {
                const service = await this.prisma.services.findUnique({
                    where: { id: itemData.serviceId },
                });
                if (!service) {
                    throw new Error(`Serviço com ID ${itemData.serviceId} não encontrado.`);
                }
                itemValue = service.value * itemData.quantity;
            }
            else if (itemData.productId) {
                const product = await this.prisma.products.findUnique({
                    where: { id: itemData.productId },
                });
                if (!product) {
                    throw new Error(`Produto com ID ${itemData.productId} não encontrado.`);
                }
                itemValue = product.price * itemData.quantity;
            }
            totalValue += itemValue;
            await this.prisma.budgetItem.create({
                data: {
                    quantity: itemData.quantity,
                    budgetId: createdBudget.id,
                    servicesId: itemData.serviceId || null,
                    productsId: itemData.productId || null,
                }
            });
        }
        const updatedBudget = await this.prisma.budget.update({
            where: { id: createdBudget.id },
            data: { totalValue }
        });
        return updatedBudget;
    }
    ;
    async update(budgetId, data) {
        const existingBudget = await this.prisma.budget.findUnique({
            where: { id: budgetId },
        });
        if (!existingBudget) {
            throw new Error(`Orçamento com ID ${budgetId} não encontrado.`);
        }
        for (const itemData of data) {
            const existingBudgetItem = await this.prisma.budgetItem.findFirst({
                where: { id: itemData.id, budgetId },
            });
            if (!existingBudgetItem) {
                throw new Error(`Item do orçamento com ID ${itemData.id} não encontrado neste orçamento.`);
            }
            await this.prisma.budgetItem.update({
                where: { id: itemData.id },
                data: {
                    quantity: itemData.quantity,
                    servicesId: itemData.servicesId || null,
                    productsId: itemData.productsId || null,
                },
            });
        }
        return this.prisma.budget.findUnique({
            where: { id: budgetId },
        });
    }
    async delete(id) {
        const numberId = Number(id);
        return await this.prisma.budget.delete({
            where: {
                id: numberId
            },
        });
    }
    ;
};
exports.BudgetRepository = BudgetRepository;
exports.BudgetRepository = BudgetRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BudgetRepository);
//# sourceMappingURL=budgets.repository.js.map