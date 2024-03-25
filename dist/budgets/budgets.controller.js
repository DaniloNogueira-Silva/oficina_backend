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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BudgetsController = void 0;
const common_1 = require("@nestjs/common");
const budgets_service_1 = require("./budgets.service");
let BudgetsController = class BudgetsController {
    constructor(budgetService) {
        this.budgetService = budgetService;
    }
    async findById(id) {
        const budget = await this.budgetService.findById(id);
        return budget;
    }
    ;
    async findAll() {
        const budgets = await this.budgetService.findAll();
        return budgets;
    }
    ;
    async create(budgetData) {
        const clientId = budgetData.clientId;
        const budgetItems = budgetData.budgetItems;
        const totalService = budgetData.totalService || 0;
        const totalProduct = budgetData.totalProduct || 0;
        const budget = await this.budgetService.create(budgetItems, clientId, totalService, totalProduct);
        return budget;
    }
    ;
    async update(id, budgetData) {
        const budget = await this.budgetService.update(id, budgetData);
        return budget;
    }
    ;
    async delete(id) {
        const budget = await this.budgetService.delete(id);
        return budget;
    }
    ;
    async generatePdf(id, res) {
        try {
            const buffer = await this.budgetService.createPdf(id);
            if (!buffer) {
                throw new Error("PDF buffer is undefined or empty.");
            }
            return res.send(buffer);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Falha ao gerar PDF: ${error.message}`);
        }
    }
};
exports.BudgetsController = BudgetsController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('pdf/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BudgetsController.prototype, "generatePdf", null);
exports.BudgetsController = BudgetsController = __decorate([
    (0, common_1.Controller)('budget'),
    __metadata("design:paramtypes", [budgets_service_1.BudgetsService])
], BudgetsController);
;
//# sourceMappingURL=budgets.controller.js.map