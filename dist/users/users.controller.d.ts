import { UserService } from './users.service';
import { User, Prisma } from '@prisma/client';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    findById(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(userData: Prisma.UserCreateInput): Promise<User>;
    update(id: number, userData: Prisma.UserUpdateInput): Promise<User>;
    delete(id: number): Promise<User>;
    login(userData: any): Promise<User>;
}
