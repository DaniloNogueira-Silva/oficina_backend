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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
let ProductsService = class ProductsService {
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async findById(id) {
        try {
            const products = await this.productsRepository.findById(id);
            if (!products) {
                throw new common_1.NotFoundException(`Products with id ${id} not found.`);
            }
            return products;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to find products: ${error.message}`);
        }
    }
    async findAll() {
        try {
            return await this.productsRepository.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to find all productss: ${error.message}`);
        }
    }
    async create(data) {
        try {
            return await this.productsRepository.create(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to create products: ${error.message}`);
        }
    }
    async update(params) {
        try {
            const products = await this.productsRepository.update(params);
            if (!products) {
                throw new common_1.NotFoundException(`Products with id ${params.id} not found.`);
            }
            return products;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to update products: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const products = await this.productsRepository.delete(id);
            if (!products) {
                throw new common_1.NotFoundException(`Products with id ${id} not found.`);
            }
            return products;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to delete products: ${error.message}`);
        }
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map