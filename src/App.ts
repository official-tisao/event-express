import express from 'express';
import { Pool } from 'pg';
import routes from './routes';
import dotenv from 'dotenv';
import logger from './configs/logger';
import { AppDataSource } from './configs/AppDataSource';
import { Category } from './entities/Category';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4002;

// Body parser middleware
app.use(express.json());
    
logger.info('Connected to the database');

AppDataSource.initialize()
    .then(() => {
        logger.info("Data Source has been initialized!");
        console.log("Data Source has been initialized!");

        const categoryRepository = AppDataSource.getRepository(Category);
        const newCategory = new Category();
        newCategory.name = 'John-Doe';
        return categoryRepository.save(newCategory);
    })
    .then((savedCategory) => {
        console.log('Category saved: ', savedCategory);
        logger.info('Category saved: ', savedCategory);
    })
    .catch((error) => {
        console.log('Error during Data Source initialization: ', error);
        logger.error('Error during Data Source initialization: ', error);
    });

const categoryRepository = AppDataSource.getRepository(Category);
const newCategory = new Category();
newCategory.name = 'John-Doe';
newCategory.id = 1;
categoryRepository.save(newCategory);
logger.info('User saved: ', newCategory);


    

app.use((err: any, req: any, res: any, next: any) => {
    console.log(`Error occurred: ${err.message}`);
    logger.error(`Error occurred: ${err.message}`);
    res.status(500).send('Something went wrong!');
  });

// Catch unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  });

// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
    console.log('Uncaught Exception thrown:', error);
    logger.error('Uncaught Exception thrown:', error);
});

// Set up routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  logger.info(`Server is running on port http://localhost:${PORT}`);
});
