import express from "express";
import { getMessages, saveMessage } from "../controllers/chat.controller.js";

const router = express.Router();

// Route to get chat history
router.get("/", getMessages);

// Route to save a new message
router.post("/", saveMessage);

export default router;
