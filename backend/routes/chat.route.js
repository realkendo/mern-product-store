import express from "express";
import { getMessages, saveMessage } from "../controllers/chat.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to get chat history
router.get("/", authMiddleware, getMessages);

// Route to save a new message
router.post("/", authMiddleware, saveMessage);

export default router;
