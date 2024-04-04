"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesModule = void 0;
const common_1 = require("@nestjs/common");
const vehicles_controller_1 = require("./vehicles.controller");
const vehicles_service_1 = require("./vehicles.service");
const vehicles_repository_1 = require("./vehicles.repository");
const prisma_service_1 = require("../prisma/prisma.service");
let VehiclesModule = class VehiclesModule {
};
exports.VehiclesModule = VehiclesModule;
exports.VehiclesModule = VehiclesModule = __decorate([
    (0, common_1.Module)({
        controllers: [vehicles_controller_1.VehiclesController],
        providers: [vehicles_service_1.VehiclesService, prisma_service_1.PrismaService, vehicles_repository_1.VehicleRepository],
        exports: [vehicles_repository_1.VehicleRepository]
    })
], VehiclesModule);
//# sourceMappingURL=vehicles.module.js.map