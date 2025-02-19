import ChatMessage from "../models/chat.model.js";

// Get all chat messages
export const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 }); // Oldest to newest
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save a new message
export const saveMessage = async (req, res) => {
  const { sender, message } = req.body;

  try {
    const newMessage = new ChatMessage({ sender, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
