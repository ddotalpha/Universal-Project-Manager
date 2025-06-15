import React from "react";

export default function WhiteboardButton() {
  const openWhiteboard = () => {
    alert("Whiteboard will open here (placeholder).");
  };

  return (
    <button
      onClick={openWhiteboard}
      style={{
        position: "fixed",
        bottom: 40,
        right: 40,
        padding: "16px 24px",
        fontSize: 18,
        borderRadius: 40,
        backgroundColor: "#2196F3",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(33, 150, 243, 0.5)",
      }}
    >
      Quick Whiteboard
    </button>
  );
}
