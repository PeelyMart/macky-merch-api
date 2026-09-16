import {Request, Response} from "express";
import IProduct from "../interfaces/IProducts"
import skuGenerator from "../util/skuGenerator"


/* All in one input validation for updates and creates 
 *
 * if update isNew = false 
 * if create isNew = true
 *
 */
function validateProduct(product: IProduct, isNew: boolean): string[]{
  const errors: string[] = []; 
  if(!product.name){
    errors.push("Name is empty");
  }
  if(!product.price){
    errors.push("Price is empty");
  }
  if(!product.stock){
    errors.push("Stock is empty"); 
  }
  if(!product.category){
    errors.push("Category is empty");
  }
  if(product.price < 0 ){
    errors.push("Product must have a positive value");
  } 
  if(!product.sku && !isNew){
    errors.push("This is a pre-existing product being updated, it should have an SKU");
  } 
  return errors;
}


export const createProduct = async(
  req: Request, 
  res: Response,
): Promise<void> => {

  //TODO:
  //create product
  //  create null checks
  //  create datatype checks
  //  price should be positive
  //create appropriate responses
  //  success: 201 + productObject
  //  fail(validation): 400 bad request
  //  fail(catch-all): 500 Internal Server error 
  
  const product = req.body as IProduct;
  const error = validateProduct(product, true); 
  
  if(error){
    return res.status(400).json({
      message: error,
    });
  } 





};

export const getProducts = async(
  req: Request, 
  res: Response,
): Promise<void> => {

  //TODO:
  //get all products
  //implement pagination
  //create appropriate responses
  //  success: 200 + array of `Product` object 
  //  fail: 500 Internal Server Error 



}; 

export const getProduct= async(
  req: Request, 
  res: Response,
): Promise<void> => {
  
  /* TODO: 
   * retrive a  product with req.param.id
   * return 200 OK + product
   * 404 NOT FOUND 
   * 500 Internal Server Error
   */

}; 

export const updateProduct = async(
  req: Request,
  res: Response
): Promise<void> => {

  /* TODO:
   * req.param.id
   * find  product -> updateProduct incorporate the same checks 
   *
   * 200 OK + updated Product
   * 404 = Not found 
   * 400 = invalid data
   * 500 = catch all 
   */
};


export const deleteProduct = async(
  req: Request, 
  res: Response,
): Promise<void> => {

  /* TODO: 
   *
   * find product to delete
   * 200 OK 
   * 404 if not found
   * 500 = catch all
   */

};




