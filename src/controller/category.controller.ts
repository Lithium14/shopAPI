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

    categoryRouter.get('/', (req: Request, res: Response) => {
      const result = categoryService.getAll();
      res.send(result);
    });

    categoryRouter.get('/:id', (req: Request, res: Response) => {
      const result = categoryService.getById(parseInt(req.params.id, 10));
      res.send(result);
    });

    categoryRouter.post('/', (req: Request, res: Response) => {
        const categoryObject = req.body;
        const result = categoryService.addCategory(categoryObject);
        res.send(result);
    });

    categoryRouter.put('/:id', (req: Request, res: Response) => {
      const categoryId = parseInt((req.params.id),10);
      const categoryObject = req.body;
      const result = categoryService.updateCategory(categoryId, categoryObject);
      res.send(result);
    });

    categoryRouter.delete('/:id', (req: Request, res: Response) => {
      const categoryId = parseInt((req.params.id),10);
      const result = categoryService.delete(categoryId);
      res.send(result);
    })

    app.use('/categories', categoryRouter);
};
