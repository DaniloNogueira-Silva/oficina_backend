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
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async findByEmail(email) {
        try {
            const user = await this.userRepository.findByEmail(email);
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
            const saltOrRounds = 10;
            const password = data.password;
            const hash = await bcrypt.hash(password, saltOrRounds);
            const param = {
                name: data.name,
                email: data.email,
                password: hash
            };
            return await this.userRepository.create(param);
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
    async login(data) {
        try {
            const user = await this.userRepository.findByEmail(data.email);
            if (!user) {
                throw new common_1.NotFoundException(`User with email ${data.email} not found.`);
            }
            const isMatch = await bcrypt.compare(data.password, user.password);
            if (!isMatch) {
                throw new common_1.NotFoundException(`The password was incorrect.`);
            }
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException(`Failed to login: ${error.message}`);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=users.service.js.map