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

    cartsRouter.get('/', (req: Request, res: Response) => {
      const result = cartService.getAll();
        res.send(result);
    });

    cartsRouter.get('/:id', (req: Request, res: Response) => {
      const result =cartService.getById(parseInt(req.params.id, 10));
        res.send(result);
    });

    cartsRouter.post('/', (req: Request, res: Response) => {
        const cart = req.body;
        res.send(cartService.addCart(cart));

    });

    cartsRouter.put('/', (req: Request, res: Response) => {
      const cartId = parseInt(req.params.id, 10);
      const newCart = req.body
      const result = cartService.updateCart(cartId, newCart);
      res.send(result);
    })

    cartsRouter.delete('/:id',(req: Request, res: Response) => {
      const cartId = parseInt(req.params.id, 10);
      const result = cartService.delete(cartId);
      res.send(result);
    })

    app.use('/carts', cartsRouter);
};
