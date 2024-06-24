const productService = require('../services/products.services');
const { validationResult } = require("express-validator");

const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, price, description, image, company_name } = req.body;
    try {
        const newProduct = await productService.createProduct( title, price, description, image, company_name );
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.status(201).json(products);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const updateProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const filter = req.query;
    const update = req.body;
    try {
        const updatedProduct = await productService.updateProduct(filter, update);
        res.status(201).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const filter = req.query;
    try {
        const deletedProduct = await productService.deleteProduct(filter);
        res.status(201).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}