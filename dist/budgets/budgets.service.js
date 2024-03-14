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
const nestjs_html_pdf_1 = require("@saemhco/nestjs-html-pdf");
const path = require("path");
let BudgetsService = class BudgetsService {
    constructor(budgetRepository) {
        this.budgetRepository = budgetRepository;
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
        const agora = new Date();
        const hora = agora.getHours();
        const minutos = agora.getMinutes();
        const actualHour = `Hora atual: ${hora}:${minutos}`;
        const totalValue = budget.budgetItem.reduce((total, item) => {
            const itemValue = item.service ? item.service.value * item.quantity : item.product?.price * item.quantity;
            return total + itemValue;
        }, 0);
        const itemsLength = budget.budgetItem.length;
        const validade = new Date();
        validade.setDate(validade.getDate() + 5);
        const data = {
            numero_orcamento: budget.id,
            data: agora.toLocaleDateString('pt-BR'),
            validade: validade.toLocaleDateString('pt-BR'),
            cliente: budget.client.name,
            endereco: budget.client.address,
            documento: budget.client.document,
            fone: budget.client.phone,
            hora: actualHour,
            veiculo: budget.client.vehicles[0].name,
            placa: budget.client.vehicles[0].plate,
            cidade: budget.client.vehicles[0].city,
            classe: budget.client.vehicles[0].name,
            cor: budget.client.vehicles[0].color,
            ano: budget.client.vehicles[0].year,
            items: budget.budgetItem.map(item => ({
                qtd: item.quantity,
                codigo: item.service ? item.service.code : item.product?.code,
                descricao: item.service ? item.service.description : item.product?.name,
                marca: item.service ? "Não tem" : item.product?.brand,
                valor: item.service ? item.service.value : item.product?.price,
                valor_total: item.service ? item.service.value * item.quantity : item.product?.price * item.quantity
            })),
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
        const filePath = path.join(process.cwd(), 'templates', 'pdf-profile.hbs');
        return (0, nestjs_html_pdf_1.createPdf)(filePath, options, data);
    }
    async create(data, clientId) {
        try {
            return await this.budgetRepository.create(data, clientId);
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
    __metadata("design:paramtypes", [budgets_repository_1.BudgetRepository])
], BudgetsService);
//# sourceMappingURL=budgets.service.js.map