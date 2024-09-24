import express from 'express';
import { Pool } from 'pg';
import routes from './routes';
import dotenv from 'dotenv';
import logger from './configs/logger';
import { createConnection } from 'typeorm';
import { Category } from './entities/Category';
dotenv.config();     
const app = express();
const PORT = process.env.PORT || 4002;

// Body parser middleware
app.use(express.json());

// Database connection setup
export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432')
});

createConnection({
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true, // set to false in production
    logging: true,
    entities: [
        Category,
    ],
  })
    .then(async connection => {
      logger.info('Connected to the database');
  
      // Example: Save a new user
      const categoryRepository = connection.getRepository(Category);
      const newCategory = new Category();
      newCategory.name = 'John-Doe';
      newCategory.parent = {name: 'Parent', id: 1};
      await categoryRepository.save(newCategory);
      logger.info('User saved: ', newCategory);
  
      // Start the server
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
      });
    })
    .catch(error => logger.error('Database connection error: ', error));

app.use((err: any, req: any, res: any, next: any) => {
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).send('Something went wrong!');
  });

// Catch unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });
  
// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
logger.error('Uncaught Exception thrown:', error);
});

// Set up routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
