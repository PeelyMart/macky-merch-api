"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price must be a positive number']
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});
exports.default = (0, mongoose_1.model)("Product", productsSchema);
