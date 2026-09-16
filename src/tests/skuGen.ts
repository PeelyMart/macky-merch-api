import {skuGenerate} from "../util/skuGenerator"

const testProduct = {
  name: "Gaming Mouse",
  category: "Electronics",
  color: "Black",
  size: "Large",
  price: 2000,
}; 

console.log(skuGenerate(testProduct));
