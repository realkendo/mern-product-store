import Product from "../models/product.model.js";
import mongoose from "mongoose";

// get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error in fetching products: ${error.message}`);
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
};

// create a product
export const createProduct = async (req, res) => {
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
};

// update a product
export const updateProduct = async (req, res) => {
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
};

// delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  // catching the 404 error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ sucess: false, messsage: "Product ID Not Found" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(`Error in deleting productr: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
