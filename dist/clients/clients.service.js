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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const clients_repository_1 = require("./clients.repository");
let ClientsService = class ClientsService {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async findById(id) {
        try {
            const client = await this.clientRepository.findById(id);
            if (!client) {
                throw new common_1.NotFoundException(`Client with email ${id} not found.`);
            }
            return client;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to find client: ${error.message}`);
        }
    }
    async findAll() {
        try {
            return await this.clientRepository.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to find all clients: ${error.message}`);
        }
    }
    async create(data) {
        try {
            return await this.clientRepository.create(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to create client: ${error.message}`);
        }
    }
    async update(params) {
        try {
            const client = await this.clientRepository.update(params);
            if (!client) {
                throw new common_1.NotFoundException(`Client with id ${params.id} not found.`);
            }
            return client;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to update client: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const client = await this.clientRepository.delete(id);
            if (!client) {
                throw new common_1.NotFoundException(`Client with id ${id} not found.`);
            }
            return client;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to delete client: ${error.message}`);
        }
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_repository_1.ClientRepository])
], ClientsService);
//# sourceMappingURL=clients.service.js.map