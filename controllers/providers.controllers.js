const providerService = require('../services/providers.services');
const { validationResult } = require("express-validator");

const createProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { company_name, CIF, address, url_web, isActive } = req.body;
    try {
        const newProvider = await providerService.createProvider(company_name, CIF, address, url_web, isActive);
        res.status(201).json(newProvider);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

const getProviders = async (req, res) => {
    try {
        const providers = await providerService.getProviders();
        res.status(201).json(providers);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

const updateProvider = async (req, res) => {
    const queryFields = ['company_name', 'CIF', 'address', 'url_web'];
    const bodyFields = ['company_name', 'CIF', 'address', 'url_web', 'isActive'];

    const queryProvided = queryFields.some(field => req.query[field] !== undefined);
    const bodyProvided = bodyFields.some(field => req.body[field] !== undefined);

    if (!queryProvided || !bodyProvided) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const filter = req.query;
        const update = req.body;
        try {
            const updatedProvider = await providerService.updateProvider(filter, update);
            res.status(201).json(updatedProvider);
        } catch (error) {
            res.status(500).json({ mensaje: error.message });
        }
    }
};

const deleteProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const filter = req.query;
    try {
        const deletedProviderAndProducts = await providerService.deleteProvider(filter);
        res.status(201).json(deletedProviderAndProducts);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
}

module.exports = {
    createProvider,
    getProviders,
    updateProvider,
    deleteProvider
}