import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// ✅ Import your actual styled pages
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";

// Home page
function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to Learnify 🎓</h1>
      <p>Empowering Teachers and Students to Learn Together</p>
      <Link
        to="/login"
        style={{
          padding: "10px 20px",
          backgroundColor: "#3b82f6",
          color: "#fff",
          borderRadius: "25px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        Go to Login
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
