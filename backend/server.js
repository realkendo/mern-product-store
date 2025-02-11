import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

// initialize dotenv
dotenv.config();

// initialize express
const app = express();

// middleware for parsing json data
app.use(express.json());

// get route for all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(`Error in fetching products: ${error.message}`);
    res.status(500).json({ sucess: false, message: "Server Error" });
  }
});

// post route for product
app.post("/api/products", async (req, res) => {
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
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  // catching the 404 error
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ sucess: false, messsage: "Product ID Not Found" });
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
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(`Error in deleting product: ${error.message}`);
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
});

// port
app.listen(5000, () => {
  connectDB();
  console.log("Server started @ https://localhost:5000");
});
