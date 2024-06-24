const express = require('express');
const router = express.Router();
const providerController = require('../controllers/providers.controllers');
const { validateCreateProvider, validateUpdateProvider, validateDeleteProvider } = require("../validators/providers.validators");

router.get('/', providerController.getProviders);
// router.get('/:id', providerController.obtenerProvider);
router.post('/', validateCreateProvider, providerController.createProvider);
router.put('/', validateUpdateProvider, providerController.updateProvider);
router.delete('/', validateDeleteProvider, providerController.deleteProvider);

module.exports = router;