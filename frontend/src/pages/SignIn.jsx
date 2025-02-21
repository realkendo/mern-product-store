import React, { useState } from "react";
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
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Sign in failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); //store the token in local storage
      navigate("/chat"); // redirect to the chat page
    } catch (error) {
      console.error(" Login error: ", error);
      setError(error.message || "something went wrong, please try again.");
    }
  };

  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

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
            style={{
              padding: "5px 10px",
              background: "blue",
              color: "white",
              width: "80%",
              margin: "10px 20px",
            }}
          >
            Sign In
          </button>
          {error && (
            <h3 style={{ color: "red", textAlign: "center" }}>{error} !!!</h3>
          )}
        </form>
      </div>
    </>
  );
};

export default SignIn;
