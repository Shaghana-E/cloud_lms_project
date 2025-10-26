import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { createUser } from "../utils/localAuth"; // ✅ added import

export default function Signup() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    try {
      // ✅ Store new user locally
      createUser({ name, email, password, role });
      alert("✅ Account created successfully! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-logo">
          <div className="signup-logo-mark">📘</div>
          <div className="signup-logo-text">LEARNIFY</div>
        </div>

        <h3 className="signup-title">SIGN UP</h3>
        <p className="signup-sub">ROLE SELECTION</p>

        <div className="signup-roles">
          <button
            className={`role-pill ${role === "student" ? "active" : ""}`}
            onClick={() => setRole("student")}
            type="button"
          >
            STUDENT
          </button>
          <button
            className={`role-pill outline ${role === "teacher" ? "active" : ""}`}
            onClick={() => setRole("teacher")}
            type="button"
          >
            TEACHER
          </button>
        </div>

        <form className="signup-form" onSubmit={handleCreate}>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <span className="input-icon">👤</span>
          </div>

          <div className="input-wrap">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="input-icon">✉️</span>
          </div>

          <div className="input-wrap">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="input-icon">🔒</span>
          </div>

          <button className="btn-primary" type="submit">
            SIGN UP
          </button>
        </form>

        <Link to="/login" className="btn-login-pill">
          LOG IN
        </Link>
      </div>
    </div>
  );
}
