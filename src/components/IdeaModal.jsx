import React, { useRef, useState, useEffect } from "react";

export default function IdeaModal({ idea, onClose, onEdit }) {
  const imageRef = useRef(null);
  const [scale, setScale] = useState(1);

  // ✅ NEW: Effect to calculate the scaling factor
  useEffect(() => {
    if (imageRef.current && idea.originalWidth) {
      const handleLoad = () => {
        const newWidth = imageRef.current.offsetWidth;
        setScale(newWidth / idea.originalWidth);
      };

      // The image might already be loaded by the browser
      if (imageRef.current.complete) {
        handleLoad();
      } else {
        imageRef.current.addEventListener('load', handleLoad);
      }

      return () => {
        if (imageRef.current) {
          imageRef.current.removeEventListener('load', handleLoad);
        }
      };
    }
  }, [idea, imageRef]);


  if (!idea) return null;

  return (
    <div style={modalStyle}>
      <h2>{idea.name}</h2>

      <div style={contentContainerStyle}>
        {/* ✅ NEW: Add ref to the image */}
        <img ref={imageRef} src={idea.drawing} alt={idea.name} style={imageStyle} />

        {/* ✅ NEW: Apply the calculated scale to the textbox positions */}
        {idea.textboxes && idea.textboxes.map(textbox => (
          <div
            key={textbox.id}
            style={{
              ...textBoxOverlayStyle,
              top: `${textbox.y * scale}px`,
              left: `${textbox.x * scale}px`,
              // Also scale the font size for better appearance
              fontSize: `${14 * scale}px`,
            }}
          >
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
  position: 'relative',
  width: '100%',
  border: '1px solid #ccc'
};

const imageStyle = {
  width: "100%",
  display: 'block'
};

const textBoxOverlayStyle = {
  position: 'absolute',
  background: 'rgba(255, 255, 224, 0.9)',
  border: '1px solid #aaa',
  padding: '2px 4px',
  minWidth: "80px",
  minHeight: "30px",
  pointerEvents: 'none',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
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