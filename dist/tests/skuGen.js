"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skuGenerator_1 = require("../util/skuGenerator");
const testProduct = {
    name: "Gaming Mouse",
    category: "Electronics",
    stock: 100,
    color: "Black",
    size: "Large",
    price: 2000,
    isAvailable: true,
};
console.log((0, skuGenerator_1.skuGenerate)(testProduct));
