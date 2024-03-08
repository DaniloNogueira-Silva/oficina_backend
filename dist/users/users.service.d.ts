import { User, Prisma } from '@prisma/client';
import { UserRepository } from './users.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findById(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(params: {
        id: number;
        data: Prisma.UserUpdateInput;
    }): Promise<User>;
    delete(id: number): Promise<User>;
}
