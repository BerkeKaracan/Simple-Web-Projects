import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    let storedUser = null;
    try {
      const raw = localStorage.getItem("user");
      storedUser = raw ? JSON.parse(raw) : null;
    } catch {
      storedUser = null;
    }

    if (!storedUser) {
      setError("No account found. Please register first.");
      return;
    }
    if (email === storedUser.email && password === storedUser.password) {
      setSuccess(`Welcome, ${storedUser.username}!`);
    } else {
      setError("Incorrect email or password.");
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="auth-alert-slot" aria-live="polite">
        {error && (
          <div className="auth-alert auth-alert--error" role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className="auth-alert auth-alert--success" role="status">
            {success}
          </div>
        )}
      </div>
      <div>
          <p>Username</p>
          <input
            type="text"
            placeholder="Enter username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
      </div>
      <div>
          <p>Email</p>
          <input
            type="text"
            placeholder="Enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>
      <div>
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
      </div>
      <button type="submit">Login</button>
        <Link to="/register">Don't have an account? Register</Link>
    </form>
  );
}
