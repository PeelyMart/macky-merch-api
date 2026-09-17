"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.createProduct = void 0;
const skuGenerator_1 = require("../util/skuGenerator");
const products_1 = __importDefault(require("../models/products"));
const mongoose_1 = __importDefault(require("mongoose"));
/* All in one input validation for updates and creates
 *
 * if update isNew = false
 * if create isNew = true
 *
 */
function validateProduct(product, isNew) {
    const errors = [];
    if (!product.name) {
        errors.push("Name is empty");
    }
    if (!product.price) {
        errors.push("Price is empty");
    }
    if (!product.stock) {
        errors.push("Stock is empty");
    }
    if (!product.category) {
        errors.push("Category is empty");
    }
    if (product.price < 0) {
        errors.push("Product must have a positive value");
    }
    if (!product.sku && !isNew) {
        errors.push("This is a pre-existing product being updated, it should have an SKU");
    }
    return errors;
}
const createProduct = async (req, res) => {
    const product = req.body;
    const error = validateProduct(product, true);
    if (error.length > 0) {
        res.status(400).json({
            message: error,
        });
        return;
    }
    product.sku = (0, skuGenerator_1.skuGenerate)(product);
    const createdProd = await products_1.default.create(product);
    if (createdProd) {
        res.status(201).json(createdProd);
        return;
    }
    res.status(500).json({
        message: "Unexpected error",
    });
    return;
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        const products = await products_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", });
    }
};
exports.getProducts = getProducts;
const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid Product ID", });
            return;
        }
        const product = await products_1.default.findById(id);
        if (!product) {
            res.status(404).json({ message: "Product not found", });
            return;
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.getProduct = getProduct;
const updateProduct = async (req, res) => {
    /* TODO:
     * req.param.id
     * find  product -> updateProduct incorporate the same checks
     *
     * 200 OK + updated Product
     * 404 = Not found
     * 400 = invalid data
     * 500 = catch all
     */
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Product ID",
            });
            return;
        }
        const existingProduct = await products_1.default.findById(id);
        if (!existingProduct) {
            res.status(404).json({
                message: "Product not found",
            });
            return;
        }
        const updatedData = {
            ...existingProduct.toObject(),
            ...req.body,
        };
        const errors = validateProduct(updatedData, false);
        if (errors.length > 0) {
            res.status(400).json({
                message: errors,
            });
            return;
        }
        const updatedProduct = await products_1.default.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                message: "Invalid Product ID",
            });
            return;
        }
        const deletedProduct = await products_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).json({
                message: "Product not found",
            });
            return;
        }
        res.status(200).json({
            message: "Product deleted",
            body: deletedProduct,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
exports.deleteProduct = deleteProduct;
