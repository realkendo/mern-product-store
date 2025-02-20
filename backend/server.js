// libraries
import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

// imports for custom files
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import chatRoutes from "./routes/chat.route.js";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import ChatMessage from "./models/chat.model.js";

// Initialize dotenv
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server and attach Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Middleware for parsing JSON data
app.use(express.json());

// enabling cors for frontend requests
app.use(cors({ origin: "http://localhost:5173" }));

// Middleware to use routes
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Receive chat message from client
  socket.on("sendMessage", async (message) => {
    console.log("Received message:", message);

    try {
      const newMessage = new ChatMessage({ sender: "User", message });
      await newMessage.save();
      console.log("message saved to database");

      // Broadcast to all clients
      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  connectDB();
  console.log(`Server started @ http://localhost:${PORT}`);
});
