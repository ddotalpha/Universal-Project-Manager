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
            style={{ width: "100%", height: 100, objectFit: "cover", borderRadius: 4 }}
          />
          <small style={{ display: "block", marginTop: 5, textAlign: "center" }}>{idea.name}</small>
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
};

const ideaBoxStyle = {
  cursor: "pointer",
  marginBottom: 15,
  border: "1px solid #ccc",
  borderRadius: 6,
  padding: 5,
  backgroundColor: "#fafafa",
  boxShadow: "0 0 4px rgba(0,0,0,0.1)",
};
