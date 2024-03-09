import { ProductsService } from './products.service';
import { Prisma, Products } from '@prisma/client';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    findById(id: number): Promise<Products | null>;
    findAll(): Promise<Products[]>;
    create(body: any): Promise<Products>;
    update(id: number, productsData: Prisma.ProductsUpdateInput): Promise<Products>;
    delete(id: number): Promise<Products>;
}
