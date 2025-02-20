import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Change to your server URL

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from backend API
    fetch("http://localhost:5000/api/chat/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched messages from database:", data); // Debug log
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  // listen for real-time messages from websocket
  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      console.log("message received on frontend", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  // send message via web socket
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: "user", message };
      console.log("sending message");
      socket.emit("sendMessage", message);
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Live Chat</h2>
      <div
        style={{
          border: "1px solid gray",
          height: "300px",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "50%", padding: "5px", height: "30px" }}
      />
      <button
        onClick={sendMessage}
        style={{
          margin: "5px",
          border: "2px solid blue",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatPage;
