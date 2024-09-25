import express from 'express';
import { Pool } from 'pg';
import routes from './routes/Index';
import dotenv from 'dotenv';
import logger from './configs/Logger';
import { AppDataSource } from './configs/AppDataSource';
import { Category } from './entities/Category';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4002;

// Body parser middleware
app.use(express.json());

(async () => {
    try {
      await AppDataSource.initialize();
      logger.info("Data Source has been initialized!");
      console.log("Data Source has been initialized!");
  
      const categoryRepository = AppDataSource.getRepository(Category);
      const newCategory = new Category();
      newCategory.name = 'John-Doe';
      const savedCategory = await categoryRepository.save(newCategory);
      
      console.log('Category saved: ', savedCategory);
      logger.info('Category saved: ', savedCategory);


      app.use((err: any, req: any, res: any, next: any) => {
        console.log(`Error occurred: ${err.message}`);
        logger.error(`Error occurred: ${err.message}`);
        res.status(500).send('Something went wrong!');
      });
  
    // Set up routes
    app.use('/api', routes);

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
        logger.info(`Server is running on port http://localhost:${PORT}`);
    });
    } catch (error) {
      console.log('Error during Data Source initialization: ', error);
      logger.error('Error during Data Source initialization: ', error);
    }
  })();




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
