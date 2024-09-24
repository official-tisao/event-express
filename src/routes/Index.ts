
import { Router } from 'express';
import { addCategory, removeCategory, getSubtree, moveSubtree } from '../controllers/CategoryController';

const router = Router();

router.post('/category', addCategory);
router.delete('/category/:id', removeCategory);
router.get('/category/:id/subtree', getSubtree);
router.put('/category/move', moveSubtree);

export default router;
