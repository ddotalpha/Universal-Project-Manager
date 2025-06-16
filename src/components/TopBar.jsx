import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faListCheck, 
  faCalendarDays, 
  faLightbulb, 
  faFolderPlus 
} from "@fortawesome/free-solid-svg-icons";

export default function TopBar({ onNewProject, onAddIdeaClick }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFeatureClick = (featureName) => {
    alert(`${featureName} feature is coming soon!`);
  };

  return (
    <div style={barStyle}>
      {/* Left Section: Action Buttons */}
      <div style={sectionStyle}>
        <button onClick={onAddIdeaClick} style={buttonStyle}>
          <FontAwesomeIcon icon={faLightbulb} />
          <span>Add Idea</span>
        </button>
        <button onClick={onNewProject} style={buttonStyle}>
          <FontAwesomeIcon icon={faFolderPlus} />
          <span>New Project</span>
        </button>
      </div>

      {/* Center Section: View Switcher Buttons */}
      <div style={sectionStyle}>
        <button onClick={() => handleFeatureClick('To-Do List')} style={buttonStyle}>
          <FontAwesomeIcon icon={faListCheck} />
          <span>To-Do List</span>
        </button>
        <button onClick={() => handleFeatureClick('Calendar')} style={buttonStyle}>
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>Calendar</span>
        </button>
      </div>

      {/* Right Section: Time */}
      <div style={{ ...sectionStyle, justifyContent: 'flex-end' }}>
        <div style={{ fontSize: 14, color: "#fff" }}>
          {time.toLocaleDateString()} {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

// Main container style
const barStyle = {
  height: 50,
  backgroundColor: "#2a9d8f",
  color: "white",
  padding: "0 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontWeight: "bold",
  borderBottom: '2px solid #248a7f'
};

// Style for each section (left, center, right) to ensure consistent spacing
const sectionStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px'
};

// ✅ A single, unified style for all buttons
const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px', // Space between icon and text
  padding: "6px 12px",
  cursor: "pointer",
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  borderRadius: 4,
  fontWeight: "bold",
  fontFamily: 'inherit', // Ensure font is consistent
  fontSize: '14px'
};