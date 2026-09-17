import {skuGenerate} from "../util/skuGenerator"

const testProduct = {
  name: "Gaming Mouse",
  category: "Electronics",
  stock: 100,
  color: "Black",
  size: "Large",
  price: 2000,
  isAvailable: true,
}; 

console.log(skuGenerate(testProduct));
