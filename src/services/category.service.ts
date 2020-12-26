import { Category } from './../models/entity/category';
import { CategoryRepository } from './../repository/category.repository';
import { getCustomRepository } from 'typeorm';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class CategoryService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: CategoryService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoryService();
        }
        return this.instance;
    }

    // Un singeleton est une class ayant une instance unique a travers toute l'app
    private repository: CategoryRepository;
    private constructor() {
        this.repository = getCustomRepository(CategoryRepository);
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

    async addCategory(category: Category) {
      // create element
      const createCategory = await this.repository.create(category);
      // save this element
      return this.repository.save(createCategory);
    }

    async updateCategory(id: number, category: Category) {
      const updateCategoryById = await this.repository.findOne(id);

      if(updateCategoryById === undefined) {
        throw new Error('Le panier est vide !')
      }
      const mergeNewCategory = this.repository.merge(updateCategoryById,category);
      const result = await this.repository.save(mergeNewCategory);
      return result
    }

    delete(id: number) {
      const findCategoryById = this.repository.findOne(id);
      return this.repository.delete(id);
    }


}
