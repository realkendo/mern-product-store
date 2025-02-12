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

// get route for all products
router.get("/", getProducts);

// post router for product
router.post("/", createProduct);

// Update route for a product
router.put("/:id", updateProduct);

// delete route for product
router.delete("/:id", deleteProduct);

export default router;
