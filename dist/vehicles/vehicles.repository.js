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
exports.VehicleRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VehicleRepository = class VehicleRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const numberId = Number(id);
        return await this.prisma.vehicle.findUnique({
            where: {
                id: numberId
            }
        });
    }
    ;
    async findAll() {
        return await this.prisma.vehicle.findMany();
    }
    ;
    async create(clientId, data) {
        const numberId = Number(clientId);
        return await this.prisma.vehicle.create({
            data: {
                name: data.name,
                plate: data.plate,
                color: data.color,
                year: data.year,
                city: data.city,
                clientId: numberId,
            }
        });
    }
    ;
    async update(params) {
        const { id, data } = params;
        const numberId = Number(id);
        const numberClientId = Number(data.clientId);
        return await this.prisma.vehicle.update({
            data: {
                name: data.name,
                plate: data.plate,
                color: data.color,
                year: data.year,
                city: data.city,
                clientId: numberClientId
            },
            where: {
                id: numberId
            },
        });
    }
    ;
    async delete(id) {
        const numberId = Number(id);
        return await this.prisma.vehicle.delete({
            where: {
                id: numberId
            },
        });
    }
    ;
};
exports.VehicleRepository = VehicleRepository;
exports.VehicleRepository = VehicleRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VehicleRepository);
//# sourceMappingURL=vehicles.repository.js.map