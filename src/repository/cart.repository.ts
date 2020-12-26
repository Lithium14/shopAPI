import { Cart } from '../models/entity/cart'
import { EntityRepository, Repository} from 'typeorm'

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requete sql)
 */
@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {

  private static instance: CartRepository;

  static getInstance() {
      if (!this.instance) {
          this.instance = new CartRepository();
      }
      return this.instance;
  }

  private constructor() {
    super();
  }

}
