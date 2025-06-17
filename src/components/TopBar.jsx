import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faLightbulb,
  faFolderPlus,
  faProjectDiagram,
  faWaveSquare, // ✅ NEW: Icon for LifeLine
} from "@fortawesome/free-solid-svg-icons";

export default function TopBar({ onNewProject, onAddIdeaClick, setCurrentView }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
        {/* ✅ NEW: LifeLine button added */}
        <button onClick={() => setCurrentView('lifeLine')} style={buttonStyle}>
          <FontAwesomeIcon icon={faWaveSquare} />
          <span>LifeLine</span>
        </button>
        <button onClick={() => setCurrentView('calendar')} style={buttonStyle}>
          <FontAwesomeIcon icon={faCalendarDays} />
          <span>Calendar</span>
        </button>
        <button onClick={() => setCurrentView('projects')} style={buttonStyle}>
          <FontAwesomeIcon icon={faProjectDiagram} />
          <span>Projects</span>
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

const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: "6px 12px",
  cursor: "pointer",
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  borderRadius: 4,
  fontWeight: "bold",
  fontFamily: 'inherit',
  fontSize: '14px'
};