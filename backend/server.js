import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

// initialize dotenv
dotenv.config();

// initialize express
const app = express();

// middleware for parsing json data
app.use(express.json());

// middleware to use product routes
app.use("/api/products", productRoutes);

// port
app.listen(5000, () => {
  connectDB();
  console.log("Server started @ https://localhost:5000");
});
