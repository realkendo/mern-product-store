import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import chatRoutes from "./routes/chat.route.js";
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

// Middleware to use routes
app.use("/api/products", productRoutes);
app.use("/api/routes/chat", chatRoutes);

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Receive chat message from client
  socket.on("sendMessage", async (message) => {
    console.log("Received message:", message);

    try {
      const newMessage = new ChatMessage({ sender: "User", message });
      await newMessage.save();
    } catch (error) {
      console.error("Error saving message:", error);
    }

    // Broadcast to all clients
    io.emit("receiveMessage", message);
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
