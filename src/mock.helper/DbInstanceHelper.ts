import { Repository, EntityManager } from "typeorm";
import { Category } from "../entities/Category";
import { DataSource } from 'typeorm';
import dotenv from "dotenv";

dotenv.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

export class TestHelper {

  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if(!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;

  getRepo(entity: string) {
    return this.dbConnect.getRepository(entity);
  }

  async setupTestDB() {
    const entitiesList = [Category];

    this.dbConnect =
    //     new DataSource({
    //   name: 'unit-tests',
    //   type: 'postgres',
    //   host: DB_HOST,
    //   port: parseInt(DB_PORT),
    //   username: DB_USER,
    //   password: DB_PASS,
    //   database: DB_NAME,
    //   entities: entitiesList,
    //   synchronize: false
    // });
    new DataSource({
      name: 'unit-tests',
      type: process.env.DB_TYPE as 'postgres',
      host: process.env.DB_HOST as string,
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.DB_USER as string,
      password: process.env.DB_PASSWORD as string,
      database: process.env.DB_NAME as string,
      synchronize: false,
      logging: false,
      // entities: ['../entities/*.ts'],
      entities: ['Category'],
    })

    await this.dbConnect.initialize();
  }

  teardownTestDB() {
    if (this.dbConnect.isInitialized) this.dbConnect.destroy();
  }

}
