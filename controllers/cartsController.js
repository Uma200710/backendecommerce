import Cart from '../models/cart.js';
import Product from '../models/product.js';

const createCart = async (req, res) => {
    try {
        const cart = new Cart();
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const getCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid).populate('products.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const { pid } = req.params;
        const { quantity } = req.body;

        const cart = await Cart.findById(req.params.cid);
        const product = await Product.findById(pid);

        if (!product) return res.status(404).json({ status: 'error', message: 'Product not found' });

        const productInCart = cart.products.find(p => p.product.toString() === pid);
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: req.body.products }, { new: true });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const removeProductFromCart = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid);
        const productIndex = cart.products.findIndex(p => p.product.toString() === req.params.pid);

        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ status: 'error', message: 'Product not found in cart' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

const removeAllFromCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.cid, { products: [] }, { new: true });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message });
    }
};

// Exportar las funciones
export { createCart, getCart, addProductToCart, updateCart, removeProductFromCart, removeAllFromCart };
