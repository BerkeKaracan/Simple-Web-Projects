import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError("Error: Please write your all infos");
      return;
    }
    if (password.length < 6) {
      setError("Password is short(6)");
      return;
    }

    if (password != confirmPassword) {
      setError("Error: Passwords not same !");
      return;
    }
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    setSuccess("Registered !");
  };
  return (
    <form onSubmit={handleRegister}>
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
      <div>
          <p>Confirm Password</p>
          <input
            type="text"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
      </div>
      <button type="submit">Register</button>
      <Link to="/login">Do you have a account: Login</Link>
    </form>
  );
}
