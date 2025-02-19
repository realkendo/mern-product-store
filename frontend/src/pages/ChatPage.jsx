import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Change to your server URL

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
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
          <div key={index}>{msg}</div>
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
