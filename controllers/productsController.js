import Product from '../models/product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();  // Obtiene todos los productos
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description, category, image, stock } = req.body;

  const product = new Product({
    name,
    price,
    description,
    category,
    image,
    stock
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
