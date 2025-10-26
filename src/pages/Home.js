import React from "react";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "linear-gradient(135deg, #3b82f6, #60a5fa)",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "10px", fontWeight: "700" }}>
        Welcome to <span style={{ color: "#fff" }}>Learnify</span>
      </h1>
      <p style={{ fontSize: "18px", maxWidth: "500px", marginBottom: "30px" }}>
        An interactive learning platform for Teachers and Students. Manage
        courses, enroll easily, and learn smarter!
      </p>
      <div>
        <a
          href="/login"
          style={{
            background: "#fff",
            color: "#1d4ed8",
            padding: "12px 24px",
            borderRadius: "30px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "0.3s",
          }}
        >
          Log In / Sign Up
        </a>
      </div>
    </div>
  );
}
