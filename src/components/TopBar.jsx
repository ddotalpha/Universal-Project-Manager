import React, { useState, useEffect } from "react";

export default function TopBar({ onNewProject, onAddIdeaClick }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={barStyle}>
      <div>
        <button onClick={onAddIdeaClick} style={buttonStyle}>
          Add Idea
        </button>
        <button onClick={onNewProject} style={buttonStyle}>
          New Project
        </button>
      </div>
      <div style={{ fontSize: 14, color: "#333" }}>
        {time.toLocaleDateString()} {time.toLocaleTimeString()}
      </div>
    </div>
  );
}

const barStyle = {
  height: 50,
  backgroundColor: "#2a9d8f",
  color: "white",
  padding: "0 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
};

const buttonStyle = {
  marginRight: 10,
  padding: "6px 12px",
  cursor: "pointer",
  backgroundColor: "white",
  color: "#2a9d8f",
  border: "none",
  borderRadius: 4,
  fontWeight: "bold",
};
