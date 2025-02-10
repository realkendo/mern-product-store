import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

// initialize dotenv
dotenv.config();

// initialize express
const app = express();

// root route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// port
app.listen(5000, () => {
  connectDB();
  console.log("Server started @ https://localhost:5000");
});
