import { CartRepository } from '../repository/cart.repository';
import { Cart } from '../models/entity/cart'
import { getCustomRepository } from 'typeorm';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class CartService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: CartService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CartService();
        }
        return this.instance;
    }

    // Un singeleton est une class ayant une instance unique a travers toute l'app
    private repository: CartRepository;
    private constructor() {
        this.repository = getCustomRepository(CartRepository);
    }

    // Business logic

    getAll() {
        return this.repository.find()
    }

    getById(id: number) {
      const searchCartById = this.repository.findOne(id)
      if(searchCartById === undefined) {
        throw new Error('Le panier n\'a pas été trouvé')
      }

      return searchCartById;
    }

    async addCart(cart: Cart) {
      // create element
      const createCart = await this.repository.create(cart);
      // save this element
      return this.repository.save(createCart);
    }

    async updateCart(id: number, cart: Cart) {
      const updateCartById = await this.repository.findOne(id);

      if(updateCartById === undefined) {
        throw new Error('Le panier est vide !')
      }
      const mergeNewCart = this.repository.merge(updateCartById,cart);
      const result = await this.repository.save(mergeNewCart);
      return result
    }

    delete(id: number) {
      const findCartById = this.repository.findOne(id);
      return this.repository.delete(id);
    }


}
