import React from "react";

export default function IdeaSection({ ideas, onSelectIdea }) {
  return (
    <div style={sidebarStyle}>
      <h3>Saved Ideas</h3>
      {ideas.length === 0 && <p>No ideas saved.</p>}
      {ideas.map((idea) => (
        <div
          key={idea.id}
          onClick={() => onSelectIdea(idea)}
          style={ideaBoxStyle}
          title={idea.name}
        >
          <img
            src={idea.drawing}
            alt={idea.name}
            style={imageStyle}
          />
          <div style={detailsStyle}>
            <small>{idea.name}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

const sidebarStyle = {
  width: 200,
  borderLeft: "1px solid #ccc",
  padding: 10,
  overflowY: "auto",
  height: "calc(100vh - 50px)",
  background: '#f7f7f7'
};

const ideaBoxStyle = {
  cursor: "pointer",
  marginBottom: 15,
  border: "1px solid #ccc",
  borderRadius: 6,
  backgroundColor: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  overflow: 'hidden'
};

const imageStyle = {
  display: 'block',
  width: "100%",
  height: 100,
  objectFit: "cover",
  background: '#f0f0f0'
};

const detailsStyle = {
  padding: '8px',
  textAlign: 'center'
};