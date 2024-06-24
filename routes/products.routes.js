const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controllers');
const { validateCreateProduct, validateUpdateProduct, validateDeleteProduct } = require("../validators/productos.validator");

router.get('/', productController.getProducts);
// router.get('/:id', productController.obtenerProduct);
router.post('/',validateCreateProduct, productController.createProduct);
router.put('/', validateUpdateProduct, productController.updateProduct);
router.delete('/', validateDeleteProduct, productController.deleteProduct);

module.exports = router;