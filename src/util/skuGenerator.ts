import {IProduct} from "../interfaces/IProducts"
import {randomUUID} from "crypto";

export function skuGenerate(product: IProduct): string{
  const words = product.name.trim().split(/\s+/); 
  let nameSku: string;
  const catSku = product.category.slice(0,3).toUpperCase();  
  let colorSku: string| undefined;
  let sizeSku: string | undefined; 
  const uuid = randomUUID().slice(0,4).toUpperCase();  


  if(words.length>1){
    nameSku = words[0].slice(0,3).toUpperCase() + words[1].slice(0,3).toUpperCase();
  }else{
    nameSku = words[0].slice(0,6).toUpperCase();
  } 


  if(product.color){
    colorSku = product.color.slice(0,3).toUpperCase();
  }
  if(product.size){
    sizeSku = product.size.slice(0,3).toUpperCase();
  }

  const sku = [nameSku, catSku, colorSku, sizeSku, uuid].filter(Boolean).join("-");
  return sku;
};
