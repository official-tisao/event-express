
import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

const categoryService = new CategoryService();

export const addCategory = async (req: Request, res: Response) => {
    const { name, parentId } = req.body;
    try {
        const result = await categoryService.addCategory(name, parentId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await categoryService.removeCategory(parseInt(id));
        res.json({ message: 'Category removed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSubtree = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const subtree = await categoryService.getSubtree(parseInt(id));
        res.json(subtree);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const moveSubtree = async (req: Request, res: Response) => {
    const { id, newParentId } = req.body;
    try {
        const result = await categoryService.moveSubtree(id, newParentId);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
