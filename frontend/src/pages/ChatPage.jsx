import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from local storage
    if (!token) {
      navigate("/login"); //redirect to login page if token is not present
      return;
    }

    // initializing socket connection with authentication
    const newSocket = io("http://localhost:5000", {
      auth: { token }, //pass token for authentication
      transports: ["websocket"], //ensure websocket transport
    });

    setSocket(newSocket);

    // Fetch messages from backend API
    fetch("http://localhost:5000/api/chat/", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched messages from database:", data); // Debug log
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
    return () => {
      newSocket.disconnect();
    };
  }, [navigate]);

  // listen for real-time messages from websocket
  useEffect(() => {
    if (!socket) return; //prevents errors if socket is null

    console.log("Socket initialized: ", socket);

    const handleMessage = (data) => {
      console.log("message received on frontend", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [socket]); //now listens when socket updates

  // send message function
  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: "user", message: message.trim() };
      console.log("sending message", newMessage);
      socket.emit("sendMessage", newMessage); //send message as object
      setMessage("");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
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
          background: "#11a",
          color: "white",
          width: "80px",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatPage;
