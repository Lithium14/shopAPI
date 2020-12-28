import { CartService } from '../services/cart.service'
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const CartController = (app: Application) => {

    const cartsRouter: Router = express.Router();
    const cartService = CartService.getInstance();

    cartsRouter.get('/', async (req: Request, res: Response) => {
      try {
        const result = await cartService.getAll();
        res.send(result);
      } catch (error) {
        res.status(404).send(`Le panier n'a pas pu être affiché`)
      }
    });

    cartsRouter.get('/:id', async (req: Request, res: Response) => {
      const cartId = parseInt(req.params.id, 10)
      try {
        const result = await cartService.getById(cartId);
        res.send(result);
      } catch (error) {
        res.status(404).send(`Le panier ${cartId} n'a pas pu être récupéré`)
      }
    });

    cartsRouter.post('/', async (req: Request, res: Response) => {
      const cart = req.body;
      try {
        const result = await cartService.addCart(cart);
        res.send(result);
      } catch (error) {
        res.status(404).send(`Le panier n'a pas pu être posté`)
      }

    });

    cartsRouter.put('/', async (req: Request, res: Response) => {
      const cartId = parseInt(req.params.id, 10);
      const newCart = req.body
      try {
        const result = await cartService.updateCart(cartId, newCart);
        res.send(result);
      } catch (error) {
        res.status(404).send(`Le panier n'a pas pu être modifié`)
      }
    })

    cartsRouter.delete('/:id', async (req: Request, res: Response) => {
      const cartId = parseInt(req.params.id, 10);
      try {
        const result = await cartService.delete(cartId);
        res.send(result);
      } catch (error) {
        res.status(404).send(`Le panier ${cartId} n'a pas pu être supprimé`)
      }
    })

    app.use('/carts', cartsRouter);
};
