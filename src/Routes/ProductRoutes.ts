import { Router } from "express";
import upload from "../Middlewares/uploadConfig";
import {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProducts,
  deleteProductsImages,
} from "../Controllers/ProductController";

const router = Router();

router.post("/addProduct", upload.array("images"), addProduct);
router.get("/getProducts", getProducts);
router.get("/getProduct/:id", getProduct);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", upload.array("images"), updateProducts);
router.get("/deleteProductImages/:id/:imageId", deleteProductsImages);

export default router;
