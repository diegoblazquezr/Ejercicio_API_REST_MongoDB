const { body, param, query } = require("express-validator");

const validateCreateProvider = [
    body("company_name")
        .exists().withMessage("Company_name is required")
        .isString().withMessage("Company_name should be string"),
    body("CIF")
        .exists().withMessage("CIF is required")
        .isString().withMessage("CIF should be string"),
    body("address")
        .exists().withMessage("Address is required")
        .isString().withMessage("Address should be string"),
    body("url_web")
        .exists().withMessage("Url_web is required")
        .isString().withMessage("Url_web should be string"),
    body("isActive")
        .exists().withMessage("isActive is required")
        .isBoolean({ strict: true }).withMessage("isActive should be a boolean")
];

const validateUpdateProvider = [
    query("company_name")
        .optional()
        .isString().withMessage("Company_name should be string"),
    query("CIF")
        .optional()
        .isString().withMessage("CIF should be string"),
    query("address")
        .optional()
        .isString().withMessage("Address should be string"),
    query("url_web")
        .optional()
        .isString().withMessage("Url_web should be string"),
    body("company_name")
        .optional()
        .isString().withMessage("Company_name should be string"),
    body("CIF")
        .optional()
        .isString().withMessage("CIF should be string"),
    body("address")
        .optional()
        .isString().withMessage("Address should be string"),
    body("url_web")
        .optional()
        .isString().withMessage("Url_web should be string"),
    body("isActive")
        .optional()
        .isBoolean({ strict: true }).withMessage("isActive should be a boolean")
];

const validateDeleteProvider = [
    query('company_name').notEmpty().withMessage("Valid company_name is required")
];

module.exports = {
    validateCreateProvider,
    validateUpdateProvider,
    validateDeleteProvider
};