import { CategoryService } from './../services/category.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const CategoryController = (app: Application) => {

    const categoryRouter: Router = express.Router();
    const categoryService = CategoryService.getInstance();

    categoryRouter.get('/', async (req: Request, res: Response) => {
      try {
        const result = await categoryService.getAll();
        res.send(result);
      } catch (error) {
        res.status(404).send(`La liste des categories de produit n'a pas pu être affiché`)
      }
    });

    categoryRouter.get('/:id', async (req: Request, res: Response) => {
      const categoryId = parseInt(req.params.id, 10);
      try {
        const result = await categoryService.getById(categoryId);
        res.send(result);
      } catch (error) {
        res.status(404).send(`L'id ${categoryId} n'a pas pu être affiché`)
      }
    });

    categoryRouter.post('/', async (req: Request, res: Response) => {
      const categoryObject = req.body;
      try {
        const result = await categoryService.addCategory(categoryObject);
        res.send(result);
      } catch (error) {
        res.status(404).send(`la catégorie n'a pas pu être ajouté`)
      }
    });

    categoryRouter.put('/:id', async (req: Request, res: Response) => {
      const categoryId = parseInt((req.params.id),10);
      const categoryObject = req.body;
      try {
        const result = await categoryService.updateCategory(categoryId, categoryObject);
        res.send(result);
      } catch (error) {
        res.status(404).send(`La catégorie ${categoryId} n'a pas pu être modifié`)
      }
    });

    categoryRouter.delete('/:id', async (req: Request, res: Response) => {
      const categoryId = parseInt((req.params.id),10);
      try {
        const result = await categoryService.delete(categoryId);
        res.send(result);
      } catch (error) {
        res.status(404).send(`L'utilisateur avec l'id ${categoryId} n'a pas pu être supprimé`)
      }
    })

    app.use('/categories', categoryRouter);
};
