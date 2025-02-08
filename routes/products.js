import express from 'express';
import { getProducts, createProduct } from '../controllers/productsController.js';

const router = express.Router();

router.get('/', getProducts);  // Obtener todos los productos
router.post('/', createProduct);  // Crear un nuevo producto

export default router;
