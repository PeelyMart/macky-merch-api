import mongoose, {Schema, model} from "mongoose";
import {IProduct} from "../interfaces/IProducts";


const productsSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },

    sku:{
      type:String,
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
      required: true,
    }, 

    color: {
      type: String
    }, 

    size: {
        type: String
    }, 

    isAvailable:{
      type: Boolean,
      default: true
    }
  }
);

export default model<IProduct>("Product", productsSchema); 


