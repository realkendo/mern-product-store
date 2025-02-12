import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router();

// get route for all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error in fetching products: ${error.message}`);
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
});

// post router for product
router.post("/", async (req, res) => {
  const product = req.body; //user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error trying to create a new product: ${error.message}`);
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
});

// Update route for a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  // catching the 404 error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ sucess: false, messsage: "Prroduct ID Not Found" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// delete route for product
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(`Error in deleting productr: ${error.message}`);
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
});

export default router;
