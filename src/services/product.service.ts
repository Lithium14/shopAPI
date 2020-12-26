import { Product } from './../models/entity/product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repository/product.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class ProductService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: ProductService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProductService();
        }
        return this.instance;
    }

    // Un singeleton est une class ayant une instance unique a travers toute l'app
    private repository: ProductRepository;
    private constructor() {
        this.repository = getCustomRepository(ProductRepository);
    }

    // Business logic

    getAll() {
      return this.repository.find()
    }

    getById(id: number) {
      const searchProductById = this.repository.findOne(id);

      if(searchProductById === undefined) {
        throw new Error('Le produit n\'existe pas');
      }

      return searchProductById;
    }

    async addProduct(product: Product) {
      const createProduct = await this.repository.create(product);
      const result = await this.repository.save(createProduct);
      return result;
    }

    async updateProduct(id: number, product: Product) {
      const searchProductById = await this.repository.findOne(id);

      if(searchProductById === undefined) {
        throw new Error('Le produit n\'a pas pu être modifié')
      }

      const mergeProduct = await this.repository.merge(searchProductById,product);
      const result = await this.repository.save(mergeProduct);

      return result
    }
    delete(id: number) {
      const searchProductByid = this.repository.findOne(id);
      if(searchProductByid === undefined) {
        throw new Error('Le produit n\'a pas pu être supprimé')
      }
      return this.repository.delete(id);
    }

}
