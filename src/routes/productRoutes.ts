import {
createProduct,
getProducts,
getProduct,
updateProduct,
deleteProduct
} from "../controllers/productController"; 

import {Router} from "express";

const router = Router();


router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct); 

export default router; 

