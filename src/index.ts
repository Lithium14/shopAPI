import 'reflect-metadata';
import express from 'express';
import loaders from './loaders';
import { UserController } from './controller/user.controller';
import { ProductController } from './controller/product.controller';
import { CartController } from './controller/cart.controller';
import { CategoryController } from './controller/category.controller';


async function startServer() {
    // Récupération de l'application initiale
    const app = express();

    // Chargement des différent loader
    await loaders(app);

    // Ajout des différentes route de votre application
    UserController(app);
    ProductController(app);
    CartController(app);
    CategoryController(app);


    // Démarrage du serveur une fois que tout est correctement init
    app.listen(3050, () => console.log('Express server  is running'));
  }

startServer();
