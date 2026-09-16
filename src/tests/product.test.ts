import { beforeAll, afterEach, afterAll,describe, it, expect } from "vitest";
import request from "supertest"
import app from "../app"
import {MongoMemoryServer} from "mongodb-memory-server";
import mongoose from "mongoose"


let mongoServer = MongoMemoryServer;

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






