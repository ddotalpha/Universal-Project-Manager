import React from "react";

export default function IdeaModal({ idea, onClose, onEdit }) {
  if (!idea) return null;

  return (
    <div style={modalStyle}>
      <h2>{idea.name}</h2>

      {/* ✅ This container will hold both the image and the text overlays */}
      <div style={contentContainerStyle}>
        {/* The background drawing */}
        <img src={idea.drawing} alt={idea.name} style={imageStyle} />

        {/* ✅ We map over the idea's textboxes and display each one */}
        {idea.textboxes && idea.textboxes.map(textbox => (
          <div
            key={textbox.id}
            style={{
              ...textBoxOverlayStyle,
              top: `${textbox.y}px`,
              left: `${textbox.x}px`,
            }}
          >
            {/* Using pre-wrap to respect newlines and formatting */}
            <p style={{ margin: 0 }}>{textbox.text}</p>
          </div>
        ))}
      </div>

      <div style={buttonContainerStyle}>
        <button onClick={() => onEdit(idea)} style={improveBtnStyle}>
          Improve
        </button>
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

const contentContainerStyle = {
  position: 'relative', // This is crucial for positioning the textboxes
  width: '100%',
  border: '1px solid #ccc'
};

const imageStyle = {
  width: "100%",
  display: 'block' // Prevents extra space below the image
};

const textBoxOverlayStyle = {
  position: 'absolute', // Positioned relative to the container
  background: 'rgba(255, 255, 224, 0.9)', // Semi-transparent yellow, like a sticky note
  border: '1px solid #aaa',
  padding: '2px 4px',
  fontSize: '14px',
  minWidth: "80px",
  minHeight: "30px",
  pointerEvents: 'none', // Makes the text non-interactive
  whiteSpace: 'pre-wrap',   // Respects newlines from the textarea
  wordWrap: 'break-word', // Ensures long words don't overflow
};

const buttonContainerStyle = {
  marginTop: 15,
  textAlign: "right",
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '10px'
};

const btnStyle = {
  padding: "6px 12px",
  cursor: "pointer",
};

const improveBtnStyle = {
  ...btnStyle,
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none'
};