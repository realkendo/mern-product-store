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

// root route
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

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

// port
app.listen(5000, () => {
  connectDB();
  console.log("Server started @ https://localhost:5000");
});
