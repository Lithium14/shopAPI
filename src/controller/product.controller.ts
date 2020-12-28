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

    productsRouter.get('/', async (req: Request, res: Response) => {
      try {
        const result = await productService.getAll();
        res.send(result);
      } catch (error) {
        res.status(404).send('La liste des produits n\'a pas pu être récupéré')
      }
    });

    productsRouter.get('/:id', async (req: Request, res: Response) => {
      const productId = parseInt(req.params.id, 10)
      try {
        const result = await productService.getById(productId);
        res.send(result);
      } catch (error) {
        res.status(404).send(`L'id ${productId} du produit n'a pas pu être récuperé`)
      }
    });

    productsRouter.post('/', async (req: Request, res: Response) => {
      const product = req.body;
      try {
        const result = await productService.addProduct(product);
        res.send(result);
      } catch (error) {
        res.status(404).send(`Le produit n'a pas pu être posté`)
      }
    });

    productsRouter.put('/:id', async (req: Request, res: Response) => {
      const productId = parseInt((req.params.id),10);
      const productObject = req.body;
      try {
        const result = await productService.updateProduct(productId, productObject);
        res.send(result);
      } catch (error) {
        res.status(404).send(`Le produit avec l'id ${productId} n'a pas pu être modifié`)
      }
    });

    productsRouter.delete('/:id', async (req: Request, res: Response) => {
      const productId = parseInt((req.params.id),10);
      try {
        const result = await productService.delete(productId);
        res.send(result);
      } catch (error) {
        res.status(404).send(`Le produit ${productId} n'a pas pu être supprimé`)
      }
    })

    app.use('/products', productsRouter);
};
