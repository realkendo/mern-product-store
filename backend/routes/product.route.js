import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

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
router.get("/", authMiddleware, getProducts);

// post router for product
router.post("/", authMiddleware, createProduct);

// Update router for a product
router.put("/:id", authMiddleware, updateProduct);

// delete router for product
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
