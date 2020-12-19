import { Sport } from '../models/entity/sport'

import { createConnection, Connection } from  'typeorm';

export default async () => {

    const connection: Connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'newuser',
        password: 'password',
        database: 'shoppingAPI',
        entities: ['models/entity/*.ts'],
        synchronize: true
    });

    return connection;
  };
