import {DataSource} from "typeorm";
import dotenv from "dotenv";
import { Category } from "../entities/Category";

dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    synchronize: true,
    logging: false,
    entities: ['Category'],
    // entities: [path.join(__dirname, '..', 'entities', '*.ts')],

    migrations: [],
    subscribers: [],
});
