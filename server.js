import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';
import connectDB from './config/db.js';
import Product from './models/product.js';

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('index', { products });
    } catch (error) {
        res.status(500).send('Error al obtener productos');
    }
});

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
