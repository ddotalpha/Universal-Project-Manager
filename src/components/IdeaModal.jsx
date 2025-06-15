import React from "react";

export default function IdeaModal({ idea, onClose }) {
  if (!idea) return null;

  return (
    <div style={modalStyle}>
      <h2>{idea.name}</h2>
      <img src={idea.drawing} alt={idea.name} style={{ width: "100%", border: "1px solid #ccc" }} />
      <div style={{ marginTop: 10, textAlign: "right" }}>
        <button onClick={onClose} style={btnStyle}>
          Close
        </button>
      </div>
    </div>
  );
}

const modalStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: 20,
  boxShadow: "0 0 10px rgba(0,0,0,0.25)",
  zIndex: 1000,
  width: 450,
  borderRadius: 8,
};

const btnStyle = {
  padding: "6px 12px",
  cursor: "pointer",
};
