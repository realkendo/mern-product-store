import express from "express";

// import routes from controller functions file
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

// initialize express router
const router = express.Router();

// get router for all products
router.get("/", getProducts);

// post router for product
router.post("/", createProduct);

// Update router for a product
router.put("/:id", updateProduct);

// delete router for product
router.delete("/:id", deleteProduct);

export default router;
