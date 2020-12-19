import { ProductService } from '../services/product.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const ProductController = (app: Application) => {

    const productsRouter: Router = express.Router();
    const productsRouter = ProductService.getInstance();

    productsRouter.get('/', (req: Request, res: Response) => {
        res.send(ProductService.getAll());
    });

    productsRouter.get('/:id', (req: Request, res: Response) => {
        res.send(ProductService.getById(parseInt(req.params.id, 10)));
    });

    productsRouter.post('/', (req: Request, res: Response) => {
        const sport = req.body;
        ProductService.addSport(sport);
        res.send(sport);

    });

    app.use('/products', productsRouter);
};
