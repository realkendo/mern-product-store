import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true }, // Username or user ID
    message: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

const ChatMessage = mongoose.model("ChatMessage", chatSchema);

export default ChatMessage;
