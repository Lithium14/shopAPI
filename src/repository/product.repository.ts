import { Product } from '../models/entity/product'
import { EntityRepository, Repository} from 'typeorm'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{

  private static instance: ProductRepository;

  static getInstance() {
      if (!this.instance) {
          this.instance = new ProductRepository();
      }
      return this.instance;
  }

  private constructor() {
    super();
  }

}
