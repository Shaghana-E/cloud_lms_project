import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { authenticate, seedDummyUsers } from "../utils/localAuth"; // ✅ added import

export default function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRole = (r) => setRole(r);

  // ✅ Seed dummy users (student & teacher) once when app loads
  useEffect(() => {
    seedDummyUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const user = authenticate(email, password); // check credentials
      alert(`✅ Welcome back, ${user.name}!`);

      // redirect based on role
      if (user.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } catch (err) {
      alert(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="lf-page">
      <div className="lf-card">
        <div className="lf-logo">
          <div className="lf-logo-mark">📘</div>
          <div className="lf-logo-text">LEARNIFY</div>
        </div>

        <h3 className="lf-title">LOGIN</h3>
        <p className="lf-sub">ROLE SELECTION</p>

        <div className="lf-roles">
          <button
            className={`role-pill ${role === "student" ? "active" : ""}`}
            onClick={() => handleRole("student")}
            type="button"
          >
            STUDENT
          </button>
          <button
            className={`role-pill outline ${role === "teacher" ? "active" : ""}`}
            onClick={() => handleRole("teacher")}
            type="button"
          >
            TEACHER
          </button>
        </div>

        <form className="lf-form" onSubmit={handleSubmit}>
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
            LOG IN
          </button>
        </form>

        {/* ✅ SIGN UP link navigates to signup page */}
        <Link to="/signup" className="btn-signup">
          SIGN UP
        </Link>
      </div>
    </div>
  );
}
