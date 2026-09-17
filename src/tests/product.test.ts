import { beforeAll, afterEach, afterAll,describe, it, expect } from "vitest";
import request from "supertest"
import app from "../app"
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose"


let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();

  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    await collections[key].deleteMany({});
  }

});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});


describe("POST /api/products", () => {
  it("returns 201 and the product in res.body", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        name: "Gaming Mouse",
        category: "Electronics",
        stock: 10,
        color: "White",
        size: "XL",
        price: 100,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Gaming Mouse");
    expect(res.body.category).toBe("Electronics");
    expect(res.body.stock).toBe(10);
    expect(res.body.price).toBe(100);
    expect(res.body.isAvailable).toBe(true);
    expect(res.body.color).toBe("White");
    expect(res.body.size).toBe("XL");
    console.log("TEST: POST /API/PRODUCTS The generated sku: " + res.body.sku);
  }); 


  it("returns 400 if its missing a name", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({
        category: "Electronics",
        stock: 10,
        price: 100,
      });
    expect(res.status).toBe(400);
  }); 

  it("returns 400 if its missing a category", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({
          name: "Mouse",
          stock: 10,
          price: 100,
        });
      expect(res.status).toBe(400);
    }); 


it("returns 400 if the price is negative", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({
          name: "Mouse",
          stock: 10,
          price: -2,
        });
      expect(res.status).toBe(400);
    });

}); 

describe("GET /api/products", () => {
  it("returns all products", async () => {
    await request(app)
      .post("/api/products")
      .send({
        name: "Gaming Mouse",
        category: "Electronics",
        stock: 10,
        price: 100,
      });

    await request(app)
      .post("/api/products")
      .send({
        name: "Keyboard",
        category: "Electronics",
        stock: 5,
        price: 200,
      });

    const res = await request(app)
      .get("/api/products");

    expect(res.status).toBe(200);
    console.log("======== GET TEST RESULT ======= RETRIEVED: =====");
    console.log(res.body);
  });
}); 


describe("GET /api/products/:id", () => {
  it("returns a product by id", async () => {
    const created = await request(app)
      .post("/api/products")
      .send({
        name: "Gaming Mouse",
        category: "Electronics",
        stock: 10,
        price: 100,
      });

    const productId = created.body._id;

    const res = await request(app)
      .get(`/api/products/${productId}`);

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(productId);
    expect(res.body.name).toBe("Gaming Mouse");
  });

    it("returns 404 when product does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .get(`/api/products/${fakeId}`);

    expect(res.status).toBe(404);
  });

  it("returns 400 for an invalid id", async () => {
  const res = await request(app)
    .get("/api/products/not-a-real-id");

  expect(res.status).toBe(400);
  });
}); 

describe("PUT /api/products/:id", () => {
  it("updates a product with partial data", async () => {
    const created = await request(app)
      .post("/api/products")
      .send({
        name: "Gaming Mouse",
        category: "Electronics",
        stock: 10,
        price: 100,
      });

    const productId = created.body._id;

    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send({
        price: 150,
      });

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(productId);
    expect(res.body.price).toBe(150);

    // Verify other fields were preserved
    expect(res.body.name).toBe("Gaming Mouse");
    expect(res.body.category).toBe("Electronics");
    expect(res.body.stock).toBe(10);
  });

  it("returns 404 when product does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .put(`/api/products/${fakeId}`)
      .send({
        price: 150,
      });

    expect(res.status).toBe(404);
  });

  it("returns 400 for an invalid id", async () => {
    const res = await request(app)
      .put("/api/products/not-a-real-id")
      .send({
        price: 150,
      });

    expect(res.status).toBe(400);
  });

  it("returns 400 when validation fails", async () => {
    const created = await request(app)
      .post("/api/products")
      .send({
        name: "Gaming Mouse",
        category: "Electronics",
        stock: 10,
        price: 100,
      });

    const productId = created.body._id;

    const res = await request(app)
      .put(`/api/products/${productId}`)
      .send({
        price: -50,
      });

    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/products/:id", () => {
  it("deletes a product", async () => {
    const created = await request(app)
      .post("/api/products")
      .send({
        name: "Gaming Mouse",
        category: "Electronics",
        stock: 10,
        price: 100,
      });

    const productId = created.body._id;

    const res = await request(app)
      .delete(`/api/products/${productId}`);

    expect(res.status).toBe(200);
  });

  it("returns 404 when product does not exist", async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app)
      .delete(`/api/products/${fakeId}`);

    expect(res.status).toBe(404);
  });

  it("returns 400 for an invalid id", async () => {
    const res = await request(app)
      .delete("/api/products/not-a-real-id");

    expect(res.status).toBe(400);
  }); 

  it("returns 404 removes the product from the database (delete then try to get it)", async () => {
    const created = await request(app)
      .post("/api/products")
      .send({
        name: "Gaming Mouse",
        category: "Electronics",
        stock: 10,
        price: 100,
      });

    const productId = created.body._id;

    await request(app)
      .delete(`/api/products/${productId}`);

    const res = await request(app)
      .get(`/api/products/${productId}`);

    expect(res.status).toBe(404);
  });
});




