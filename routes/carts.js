import express from 'express';
import { 
    createCart,
    getCart,
    addProductToCart,
    updateCart,
    removeProductFromCart,
    removeAllFromCart 
} from '../controllers/cartsController.js';

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', addProductToCart);
router.delete('/:cid/products/:pid', removeProductFromCart);
router.delete('/:cid', removeAllFromCart);

export default router;
