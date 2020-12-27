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

    usersRouter.get('/', async (req: Request, res: Response) => {
      try {
        const result = await userService.getAll();
        res.send(result);
      } catch (error) {
        res.status(404).send('La liste des utilisateurs n\'a pas pu être récupéré')
      }
    });


    usersRouter.get('/:id', async (req: Request, res: Response) => {
      const id = parseInt(req.params.id, 10)
      try {
        const result = await userService.getById(id);
        res.send(result);
      } catch (error) {
        res.status(404).send(`L'id ${id} de l'utilisateur n'a pas pu être récuperé`)
      }
    });

    usersRouter.post('/', async (req: Request, res: Response) => {
      const userObject = req.body;
      try {
        const result = await userService.addUser(userObject);
        res.send(result);
      } catch (error) {
        res.status(404).send('L\'utilisateur n\'a pas pu être posté')
      }

    });

    usersRouter.put('/:id', async (req: Request, res: Response) => {
      const userId = parseInt((req.params.id),10);
      const userObject = req.body;
      try {
        const result = await userService.updateUser(userId, userObject);
        res.send(result);
      } catch (error) {
        res.status(404).send(`L'utilisateur ${userObject} avec l'id ${userId} n'a aps pu être modifié`)
      }
    });

    usersRouter.delete('/:id', async (req: Request, res: Response) => {
      const userId = parseInt((req.params.id),10);
      try {
        const result = await userService.delete(userId);
        res.send(result);
      } catch (error) {
        res.status(404).send(`L'utilisateur ${userId} n'a pas pu être supprimé`)
      }
    })

    app.use('/users', usersRouter);
};
