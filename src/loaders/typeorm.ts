import { Cart } from './../models/entity/cart';
import { Product } from './../models/entity/product';
import { User } from './../models/entity/user';
import { createConnection, Connection } from  'typeorm';
// TODO process env data


export default async () => {

    const connection: Connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'newuser',
        password: 'password',
        database: 'shoppingAPI',
        entities: [
          User,
          Product,
          Cart
        ],
        synchronize: true
    });

    return connection;
  };
