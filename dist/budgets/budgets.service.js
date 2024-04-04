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
exports.BudgetsService = void 0;
const common_1 = require("@nestjs/common");
const budgets_repository_1 = require("./budgets.repository");
const vehicles_repository_1 = require("../vehicles/vehicles.repository");
let BudgetsService = class BudgetsService {
    constructor(budgetRepository, vehicleRepository) {
        this.budgetRepository = budgetRepository;
        this.vehicleRepository = vehicleRepository;
    }
    async findById(id) {
        try {
            const budget = await this.budgetRepository.findById(id);
            if (!budget) {
                throw new common_1.NotFoundException(`Budget with id ${id} not found.`);
            }
            return budget;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to find budget: ${error.message}`);
        }
    }
    async findAll() {
        try {
            return await this.budgetRepository.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to find all budgets: ${error.message}`);
        }
    }
    async createPdf(id) {
        const budget = await this.findById(id);
        const vehicle = await this.vehicleRepository.findById(budget.vehicleId);
        const agora = new Date();
        const hora = agora.getHours();
        const minutos = agora.getMinutes();
        const actualHour = `Hora atual: ${hora}:${minutos}`;
        const totalValue = budget.totalValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        const itemsLength = budget.budgetItem.length;
        const data = {
            numero_orcamento: budget.id,
            data: agora.toLocaleDateString('pt-BR'),
            cliente: budget.client.name,
            endereco: budget.client.address,
            documento: budget.client.document,
            fone: budget.client.phone,
            hora: actualHour,
            veiculo: vehicle.name,
            placa: vehicle.plate,
            cidade: vehicle.city,
            classe: vehicle.name,
            cor: vehicle.color,
            ano: vehicle.year,
            items: budget.budgetItem.map(item => ({
                qtd: item.quantity,
                codigo: item.service ? item.service.code : item.product?.code,
                descricao: item.service ? item.service.description : item.product?.name,
                marca: item.service ? "Não tem" : item.product?.brand,
                valor: item.service ? item.service.value : item.product?.price,
                valor_total: item.service ? item.service.value * item.quantity : item.product?.price * item.quantity
            })),
            total: totalValue,
            totalItems: itemsLength,
            validate: budget.validate
        };
        return data;
    }
    async create(data, clientId, validate, totalService, totalProduct, vehicleId) {
        try {
            return await this.budgetRepository.create(data, clientId, validate, totalService, totalProduct, vehicleId);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to create budget: ${error.message}`);
        }
    }
    async update(budgetId, data) {
        try {
            const budget = await this.budgetRepository.update(budgetId, data);
            if (!budget) {
                throw new common_1.NotFoundException(`Budget with id ${budgetId} not found.`);
            }
            return budget;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to update budget: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const budget = await this.budgetRepository.delete(id);
            if (!budget) {
                throw new common_1.NotFoundException(`Budget with id ${id} not found.`);
            }
            return budget;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to delete budget: ${error.message}`);
        }
    }
};
exports.BudgetsService = BudgetsService;
exports.BudgetsService = BudgetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [budgets_repository_1.BudgetRepository,
        vehicles_repository_1.VehicleRepository])
], BudgetsService);
//# sourceMappingURL=budgets.service.js.map