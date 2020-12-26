import { UserService } from '../services/user.service'
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const UserController = (app: Application) => {

    const usersRouter: Router = express.Router();
    const userService = UserService.getInstance();

    usersRouter.get('/', (req: Request, res: Response) => {
      const result = userService.getAll();
      res.send(result);
    });

    usersRouter.get('/:id', (req: Request, res: Response) => {
      const result = userService.getById(parseInt(req.params.id, 10));
      res.send(result);
    });

    usersRouter.post('/', (req: Request, res: Response) => {
        const userObject = req.body;
        const result = userService.addUser(userObject);
        res.send(result);
    });

    usersRouter.put('/:id', (req: Request, res: Response) => {
      const userId = parseInt((req.params.id),10);
      const userObject = req.body;
      const result = userService.updateUser(userId, userObject);
      res.send(result);
    });

    usersRouter.delete('/:id', (req: Request, res: Response) => {
      const userId = parseInt((req.params.id),10);
      const result = userService.delete(userId);
      res.send(result);
    })

    app.use('/users', usersRouter);
};
