import {DataSource} from "typeorm";
import {Pool} from "pg";
import dotenv from "dotenv";
import logger from "./Logger";
import { Category } from "../entities/Category";
import path from "path";

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
    // entities: ['../entities/*.ts'],
    //entities: ['Category'],
    entities: [path.join(__dirname, '..', 'entities', '*.ts')],

    migrations: [],
    subscribers: [],
});

// // Initialize the data source (connection)
// await AppDataSource.initialize()
//     .then(() => {
//         logger.info("Data Source has been initialized!");
//         console.log("Data Source has been initialized!");
//     })
//     .catch((error) => {
//         logger.error("Error during Data Source initialization:", error);
//         console.error("Error during Data Source initialization:", error);
//     });

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432')
});
