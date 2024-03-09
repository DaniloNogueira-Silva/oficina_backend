import { ProductsRepository } from './products.repository';
import { Products } from '@prisma/client';
export declare class ProductsService {
    private readonly productsRepository;
    constructor(productsRepository: ProductsRepository);
    findById(id: number): Promise<Products | null>;
    findAll(): Promise<Products[]>;
    create(data: any): Promise<Products>;
    update(params: {
        id: number;
        data: any;
    }): Promise<Products>;
    delete(id: number): Promise<Products>;
}
