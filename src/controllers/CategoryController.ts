
import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';
import { pool } from '../configs/AppDataSource';
import logger from '../configs/Logger';
import { CustomException } from '../exceptions/CustomException';

const categoryService = new CategoryService();

export const addCategory = async (req: Request, res: Response) => {
    const { name, parentID } = req.body;
    try {
        const result = await categoryService.addCategory(name, parentID);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const removeCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await categoryService.removeCategory(parseInt(id));
        res.status(204).json();
        // res.status(204).json({ message: 'Category removed' });
    }catch (error: any) {
        if (error instanceof CustomException) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};
export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, parentID } = req.body;
    try {
        const result = await categoryService.updateCategoryById(parseInt(id), name, parentID);
        res.status(200).json(result);
    }catch (error: any) {
        if (error instanceof CustomException) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

export const getSubtree = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const children = await categoryService.getSubtree(parseInt(id));
        res.json(children);
    } catch (error: any) {
        if (error instanceof CustomException) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await categoryService.getCategoryById(parseInt(id)); //getSubtree(parseInt(id));
        res.json(result);
    } catch (error: any) {
        if (error instanceof CustomException) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

export const moveSubtree = async (req: Request, res: Response) => {
    const { id, newParentId } = req.params;
    try {
        const result = await categoryService.moveSubtree(parseInt(id), parseInt(newParentId));
        res.status(200).json(result);
    } catch (error: any) {
        if (error instanceof CustomException) {
            res.status(error.status).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

export const getAllCategories = async(req: Request, res: Response) => {
    try {
        const result = await categoryService.getAllCategories();
        res.json(result);
    } catch (error: any) {
        console.error(error.message);
        logger.error(error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

export const getDefaultAndHealthCheck = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json("Server UP as at " + result.rows);
    } catch (error: any) {
        console.error(error.message);
        logger.error(error.message);
          res.status(500).json({ error: 'Server error' });
    }
};
