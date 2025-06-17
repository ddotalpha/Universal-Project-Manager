import React, { useState } from 'react';

export default function AddEventPopup({ popupInfo, onSave, onClose }) {
  const [name, setName] = useState('');
  const [effort, setEffort] = useState(popupInfo.effort);

  const handleSave = (e) => {
    e.preventDefault();
    if (name) {
      onSave({
        name,
        effort,
        date: popupInfo.date,
      });
    }
  };

  return (
    <div className="add-event-popup" style={{ top: popupInfo.y, left: popupInfo.x }}>
      <form onSubmit={handleSave}>
        <button type="button" className="close-btn" onClick={onClose}>×</button>
        <h4>Add New Plan</h4>
        <p className='popup-date-display'>Date: {popupInfo.date}</p>
        <input
          type="text"
          placeholder="Plan name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <label>
          Effort: {effort}
          <input
            type="range"
            min="1"
            max="10"
            value={effort}
            onChange={(e) => setEffort(Number(e.target.value))}
          />
        </label>
        <button type="submit" className="save-btn">Save Plan</button>
      </form>
    </div>
  );
}