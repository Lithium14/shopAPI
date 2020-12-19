import { CartService } from '../services/cart.service.service';
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
    const cartsRouter = CartService.getInstance();

    cartsRouter.get('/', (req: Request, res: Response) => {
        res.send(cartsRouter.getAll());
    });

    cartsRouter.get('/:id', (req: Request, res: Response) => {
        res.send(CartService.getById(parseInt(req.params.id, 10)));
    });

    cartsRouter.post('/', (req: Request, res: Response) => {
        const sport = req.body;
        CartService.addSport(sport);
        res.send(sport);

    });

    app.use('/carts', cartsRouter);
};
