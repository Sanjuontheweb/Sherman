import { Router } from 'express'
import { getOrders, getOrder, postOrder, deltaOrder } from '../server/mongodb/controller/orders.controller.js';

const router = Router();

router.get('/', getOrders);
router.get('/:id', getOrder);  
router.post('/create', postOrder);
router.delete('/:id', deltaOrder); 

export default router;