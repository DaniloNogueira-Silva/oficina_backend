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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findById(email) {
        try {
            const user = await this.userRepository.findById(email);
            if (!user) {
                throw new common_1.NotFoundException(`User with email ${email} not found.`);
            }
            return user;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to find user: ${error.message}`);
        }
    }
    async findAll() {
        try {
            return await this.userRepository.findAll();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Failed to find all users: ${error.message}`);
        }
    }
    async create(data) {
        try {
            return await this.userRepository.create(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to create user: ${error.message}`);
        }
    }
    async update(params) {
        try {
            const user = await this.userRepository.update(params);
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${params.id} not found.`);
            }
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to update user: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            const user = await this.userRepository.delete(id);
            if (!user) {
                throw new common_1.NotFoundException(`User with id ${id} not found.`);
            }
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to delete user: ${error.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=users.service.js.map