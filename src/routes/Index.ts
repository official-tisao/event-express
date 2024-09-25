
import { Router } from 'express';
import {
    addCategory,
    removeCategory,
    getSubtree,
    moveSubtree,
    getDefaultAndHealthCheck,
    getAllCategories,
    getCategory
} from '../controllers/CategoryController';

const router = Router();

router.post('/category', addCategory);
router.delete('/category/:id', removeCategory);
router.get('/category/:id', getCategory);
router.get('/category/:id/subtree', getSubtree);
router.put('/category/move', moveSubtree);
router.get('/health', getDefaultAndHealthCheck);
router.get('/', getAllCategories);
export default router;
