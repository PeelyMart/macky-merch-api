"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const mongoose_1 = __importDefault(require("mongoose"));
let mongoServer;
(0, vitest_1.beforeAll)(async () => {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    await mongoose_1.default.connect(mongoServer.getUri());
});
(0, vitest_1.afterEach)(async () => {
    const collections = mongoose_1.default.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});
(0, vitest_1.afterAll)(async () => {
    await mongoose_1.default.disconnect();
    await mongoServer.stop();
});
(0, vitest_1.describe)("POST /api/products", () => {
    (0, vitest_1.it)("returns 201 and the product in res.body", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Gaming Mouse",
            category: "Electronics",
            stock: 10,
            color: "White",
            size: "XL",
            price: 100,
        });
        (0, vitest_1.expect)(res.status).toBe(201);
        (0, vitest_1.expect)(res.body.name).toBe("Gaming Mouse");
        (0, vitest_1.expect)(res.body.category).toBe("Electronics");
        (0, vitest_1.expect)(res.body.stock).toBe(10);
        (0, vitest_1.expect)(res.body.price).toBe(100);
        (0, vitest_1.expect)(res.body.isAvailable).toBe(true);
        (0, vitest_1.expect)(res.body.color).toBe("White");
        (0, vitest_1.expect)(res.body.size).toBe("XL");
        console.log("TEST: POST /API/PRODUCTS The generated sku: " + res.body.sku);
    });
    (0, vitest_1.it)("returns 400 if its missing a name", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            category: "Electronics",
            stock: 10,
            price: 100,
        });
        (0, vitest_1.expect)(res.status).toBe(400);
    });
    (0, vitest_1.it)("returns 400 if its missing a category", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Mouse",
            stock: 10,
            price: 100,
        });
        (0, vitest_1.expect)(res.status).toBe(400);
    });
    (0, vitest_1.it)("returns 400 if the price is negative", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Mouse",
            stock: 10,
            price: -2,
        });
        (0, vitest_1.expect)(res.status).toBe(400);
    });
});
(0, vitest_1.describe)("GET /api/products", () => {
    (0, vitest_1.it)("returns all products", async () => {
        await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Gaming Mouse",
            category: "Electronics",
            stock: 10,
            price: 100,
        });
        await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Keyboard",
            category: "Electronics",
            stock: 5,
            price: 200,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/api/products");
        (0, vitest_1.expect)(res.status).toBe(200);
        console.log("======== GET TEST RESULT ======= RETRIEVED: =====");
        console.log(res.body);
    });
});
(0, vitest_1.describe)("GET /api/products/:id", () => {
    (0, vitest_1.it)("returns a product by id", async () => {
        const created = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Gaming Mouse",
            category: "Electronics",
            stock: 10,
            price: 100,
        });
        const productId = created.body._id;
        const res = await (0, supertest_1.default)(app_1.default)
            .get(`/api/products/${productId}`);
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body._id).toBe(productId);
        (0, vitest_1.expect)(res.body.name).toBe("Gaming Mouse");
    });
    (0, vitest_1.it)("returns 404 when product does not exist", async () => {
        const fakeId = new mongoose_1.default.Types.ObjectId();
        const res = await (0, supertest_1.default)(app_1.default)
            .get(`/api/products/${fakeId}`);
        (0, vitest_1.expect)(res.status).toBe(404);
    });
    (0, vitest_1.it)("returns 400 for an invalid id", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/api/products/not-a-real-id");
        (0, vitest_1.expect)(res.status).toBe(400);
    });
});
(0, vitest_1.describe)("PUT /api/products/:id", () => {
    (0, vitest_1.it)("updates a product with partial data", async () => {
        const created = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Gaming Mouse",
            category: "Electronics",
            stock: 10,
            price: 100,
        });
        const productId = created.body._id;
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/products/${productId}`)
            .send({
            price: 150,
        });
        (0, vitest_1.expect)(res.status).toBe(200);
        (0, vitest_1.expect)(res.body._id).toBe(productId);
        (0, vitest_1.expect)(res.body.price).toBe(150);
        // Verify other fields were preserved
        (0, vitest_1.expect)(res.body.name).toBe("Gaming Mouse");
        (0, vitest_1.expect)(res.body.category).toBe("Electronics");
        (0, vitest_1.expect)(res.body.stock).toBe(10);
    });
    (0, vitest_1.it)("returns 404 when product does not exist", async () => {
        const fakeId = new mongoose_1.default.Types.ObjectId();
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/products/${fakeId}`)
            .send({
            price: 150,
        });
        (0, vitest_1.expect)(res.status).toBe(404);
    });
    (0, vitest_1.it)("returns 400 for an invalid id", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .put("/api/products/not-a-real-id")
            .send({
            price: 150,
        });
        (0, vitest_1.expect)(res.status).toBe(400);
    });
    (0, vitest_1.it)("returns 400 when validation fails", async () => {
        const created = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Gaming Mouse",
            category: "Electronics",
            stock: 10,
            price: 100,
        });
        const productId = created.body._id;
        const res = await (0, supertest_1.default)(app_1.default)
            .put(`/api/products/${productId}`)
            .send({
            price: -50,
        });
        (0, vitest_1.expect)(res.status).toBe(400);
    });
});
(0, vitest_1.describe)("DELETE /api/products/:id", () => {
    (0, vitest_1.it)("deletes a product", async () => {
        const created = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Gaming Mouse",
            category: "Electronics",
            stock: 10,
            price: 100,
        });
        const productId = created.body._id;
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/products/${productId}`);
        (0, vitest_1.expect)(res.status).toBe(200);
    });
    (0, vitest_1.it)("returns 404 when product does not exist", async () => {
        const fakeId = new mongoose_1.default.Types.ObjectId();
        const res = await (0, supertest_1.default)(app_1.default)
            .delete(`/api/products/${fakeId}`);
        (0, vitest_1.expect)(res.status).toBe(404);
    });
    (0, vitest_1.it)("returns 400 for an invalid id", async () => {
        const res = await (0, supertest_1.default)(app_1.default)
            .delete("/api/products/not-a-real-id");
        (0, vitest_1.expect)(res.status).toBe(400);
    });
    (0, vitest_1.it)("returns 404 removes the product from the database (delete then try to get it)", async () => {
        const created = await (0, supertest_1.default)(app_1.default)
            .post("/api/products")
            .send({
            name: "Gaming Mouse",
            category: "Electronics",
            stock: 10,
            price: 100,
        });
        const productId = created.body._id;
        await (0, supertest_1.default)(app_1.default)
            .delete(`/api/products/${productId}`);
        const res = await (0, supertest_1.default)(app_1.default)
            .get(`/api/products/${productId}`);
        (0, vitest_1.expect)(res.status).toBe(404);
    });
});
