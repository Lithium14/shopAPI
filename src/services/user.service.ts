import { User } from './../models/entity/user';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repository/user.repository';

/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class UserService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: UserService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }
        return this.instance;
    }

    // Un singeleton est une class ayant une instance unique a travers toute l'app
    private repository: UserRepository;
    private constructor() {
        this.repository = getCustomRepository(UserRepository);
    }

    // Business logic

    getAll() {
        return this.repository.find()
    }

    getById(id: number) {
      const searchUserById = this.repository.findOne(id);
      if(searchUserById === undefined) {
        throw Error('L\'utilisateur n\'a pas pu être récupéré')
      }

      return searchUserById;
    }

    async addUser(user: any) {
      const createUser = await this.repository.create(user);
      // save this element
      return this.repository.save(createUser);
    }

    async updateUser(id: number, user: User) {
      const updateUserById = await this.repository.findOne(id);

      if(updateUserById === undefined) {
        throw new Error('pas trouvé !')
      }
      const mergeNewUser = this.repository.merge(updateUserById,user);
      const result = await this.repository.save(mergeNewUser);
      return result
    }

    delete(id: number) {
      const findUserById = this.repository.findOne(id);

      if(findUserById === undefined) {
        throw Error('L\'utilisateur n\'a pas pu être trouvé')
      }
      return this.repository.delete(id);
    }

}
