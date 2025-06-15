import React from "react";

export default function ProjectBox({ project }) {
  return (
    <div style={boxStyle}>
      <h3>{project.name}</h3>
      <p style={{ color: "#888" }}>ID: {project.id}</p>
    </div>
  );
}

const boxStyle = {
  padding: 20,
  border: "2px solid #ccc",
  borderRadius: 10,
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};
