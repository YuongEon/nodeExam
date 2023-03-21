import express from 'express';
import { create, deletePr, getAll, getOne, updatePr } from '../controllers/product.js';
const router = express.Router();

router.post('/products/add', create);
router.get('/products', getAll);
router.get('/products/:id', getOne);
router.patch('/products/:id', updatePr);
router.delete('/products/:id', deletePr);

export default router