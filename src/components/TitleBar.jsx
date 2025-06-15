import React from "react";

export default function TitleBar({ onNewProject }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #ccc",
        paddingBottom: 10,
      }}
    >
      <h1 style={{ fontSize: 28, color: "#333" }}>Universal Project Manager</h1>
      <div>
        <button
          onClick={onNewProject}
          style={{
            fontSize: 16,
            padding: "8px 16px",
            borderRadius: 8,
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          + New Project
        </button>
      </div>
    </div>
  );
}
