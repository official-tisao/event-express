
import { Router } from 'express';
import {
    addCategory,
    removeCategory,
    getSubtree,
    moveSubtree,
    getDefaultAndHealthCheck,
    getAllCategories,
    getCategory,
    updateCategory
} from '../controllers/CategoryController';

const router = Router();

router.post('/category', addCategory);
router.delete('/category/:id', removeCategory);
router.get('/category/:id', getCategory);
router.put('/category/:id/update', updateCategory);
router.get('/category/:id/children', getSubtree);
router.put('/category/:id/move/:newParentId', moveSubtree);
router.get('/health', getDefaultAndHealthCheck);
router.get('/', getAllCategories);
export default router;
