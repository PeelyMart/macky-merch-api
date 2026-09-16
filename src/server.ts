import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";
import Product from "./models/products";


dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if(!MONGO_URI){
 throw new Error("MONGO_URI is MISSING from .env");
}


const startServer = async(): Promise<void> =>{
  try{
    await mongoose.connect(MONGO_URI); 

    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server lisening on ${PORT}`);
    }) 

    const testProduct = await Product.create({
      name: "TestHoodie",
      price: 1200, 
      stock: 10,
      sku: "test-Sku-123",
      category: "Clothing",
      description: "Official LSCS Hoodie"
    }); 

    console.log(testProduct);




  }catch(error){
    console.error("Failed to connect to MongoDB");
    console.error(error);

    process.exit(1);
  }
}; 

startServer();
