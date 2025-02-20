import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); //clear previous error message

    try {
      const response = await fetch("https://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }

      localStorage.setItem("token", data.token); //store the token in local storage
      navigate("/chat"); // redirect to the chat page
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />

          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", margin: "10px 0", padding: "5px" }}
          />
          <button
            type="submit"
            style={{ padding: "5px 10px", background: "blue", color: "white" }}
          >
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;
