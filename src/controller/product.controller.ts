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
    const productService = ProductService.getInstance();

    productsRouter.get('/', (req: Request, res: Response) => {
      const result = productService.getAll();
      res.send(result);
    });

    productsRouter.get('/:id', (req: Request, res: Response) => {
      const result = productService.getById(parseInt(req.params.id, 10));
      res.send(result);
    });

    productsRouter.post('/', (req: Request, res: Response) => {
        const product = req.body;
        const result = productService.addProduct(product);
        res.send(result);
    });

    productsRouter.put('/:id', (req: Request, res: Response) => {
      const productId = parseInt((req.params.id),10);
      const productObject = req.body;
      const result = productService.updateProduct(productId, productObject);
      res.send(result);
    });

    productsRouter.delete('/:id', (req: Request, res: Response) => {
      const productId = parseInt((req.params.id),10);
      const result = productService.delete(productId);
      res.send(result);
    })

    app.use('/products', productsRouter);
};
