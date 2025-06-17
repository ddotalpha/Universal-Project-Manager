import React, { useMemo, useRef, useState } from 'react';
import AddEventPopup from './AddEventPopup'; // ✅ NEW: Import the popup component

// Main LifeLine View
export default function LifeLineView({ events, onSaveEvent, onUpdateEvent }) {
  const timelineContentRef = useRef(null);
  // ✅ NEW: State to manage the "add event" popup
  const [popupInfo, setPopupInfo] = useState(null);

  // Memoize sorted events and calculations
  const { positions, pathData, years, months, startDate, totalDays } = useMemo(() => {
    if (events.length === 0) {
        // Provide a default view if there are no events
        const start = new Date(new Date().getFullYear(), 0, 1); // Start of current year
        const end = new Date(new Date().getFullYear() + 1, 0, 1); // End of current year
        const days = (end - start) / (1000 * 60 * 60 * 24);
        return { positions: [], pathData: '', years: [{year: start.getFullYear(), x: 50}], months: [], startDate: start, totalDays: days };
    }

    const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

    const start = new Date(sortedEvents[0].date);
    const end = new Date(sortedEvents[sortedEvents.length - 1].date);
    
    start.setFullYear(start.getFullYear() - 1);
    end.setFullYear(end.getFullYear() + 1);

    const days = (end - start) / (1000 * 60 * 60 * 24);
    
    // Calculate Year Markers
    const yearMarkers = [];
    for (let y = start.getFullYear(); y <= end.getFullYear(); y++) {
        const yearDate = new Date(y, 0, 1);
        const daysFromStart = (yearDate - start) / (1000 * 60 * 60 * 24);
        yearMarkers.push({ year: y, x: (daysFromStart / days) * 100 });
    }
    
    // ✅ NEW: Calculate Month Markers
    const monthMarkers = [];
    let loopDate = new Date(start);
    while (loopDate < end) {
        if(loopDate.getMonth() !== 0) { // Don't show month if it's January (to avoid overlap with year)
            const daysFromStart = (loopDate - start) / (1000 * 60 * 60 * 24);
            monthMarkers.push({
                name: loopDate.toLocaleString('default', { month: 'short' }),
                x: (daysFromStart / days) * 100,
            });
        }
        loopDate.setMonth(loopDate.getMonth() + 1);
    }

    const eventPositions = sortedEvents.map(event => {
      const eventDate = new Date(event.date);
      const daysFromStart = (eventDate - start) / (1000 * 60 * 60 * 24);
      return {
        ...event,
        x: (daysFromStart / days) * 100,
        y: 100 - ((event.effort - 1) * (100 / 9) * 0.8 + 10),
      };
    });

    const svgPath = eventPositions.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

    return { positions: eventPositions, pathData: svgPath, years: yearMarkers, months: monthMarkers, startDate: start, totalDays: days };
  }, [events]);
  
  // Drag and Drop Handler (remains the same)
  const handleMouseDown = (e, eventToDrag) => {
    e.preventDefault();
    if (popupInfo) return; // Don't allow dragging while popup is open
    const draggedElement = e.currentTarget;
    draggedElement.classList.add('dragging');
    const timelineRect = timelineContentRef.current.getBoundingClientRect();
    let finalEventData = { ...eventToDrag };
    const handleMouseMove = (moveEvent) => {
      const newX = moveEvent.clientX - timelineRect.left;
      const newY = moveEvent.clientY - timelineRect.top;
      const clampedX = Math.max(0, Math.min(newX, timelineRect.width));
      const clampedY = Math.max(0, Math.min(newY, timelineRect.height));
      draggedElement.style.left = `${(clampedX / timelineRect.width) * 100}%`;
      draggedElement.style.top = `${(clampedY / timelineRect.height) * 100}%`;
      const percentX = (clampedX / timelineRect.width);
      const newDays = Math.round(totalDays * percentX);
      const newDate = new Date(startDate);
      newDate.setDate(startDate.getDate() + newDays);
      const newEffort = 10 - ((clampedY / timelineRect.height) * 9);
      const clampedEffort = Math.max(1, Math.min(Math.round(newEffort), 10));
      finalEventData.date = newDate.toISOString().slice(0, 7);
      finalEventData.effort = clampedEffort;
    };
    const handleMouseUp = () => {
      draggedElement.classList.remove('dragging');
      draggedElement.style.left = '';
      draggedElement.style.top = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      onUpdateEvent(finalEventData);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // ✅ NEW: Handler for creating a new event by double-clicking the timeline
  const handleTimelineDoubleClick = (e) => {
    const timelineRect = timelineContentRef.current.getBoundingClientRect();
    const clickX = e.clientX - timelineRect.left;
    const clickY = e.clientY - timelineRect.top;

    const percentX = (clickX / timelineRect.width);
    const newDays = Math.round(totalDays * percentX);
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + newDays);

    const newEffort = 10 - ((clickY / timelineRect.height) * 9);
    const clampedEffort = Math.max(1, Math.min(Math.round(newEffort), 10));
    
    setPopupInfo({
        x: e.pageX, // Use page coordinates for positioning the popup
        y: e.pageY,
        date: newDate.toISOString().slice(0, 7), // YYYY-MM
        effort: clampedEffort,
    });
  };
  
  // ✅ NEW: Handler for when the popup saves a new event
  const handlePopupSave = (newEventData) => {
    onSaveEvent(newEventData);
    setPopupInfo(null); // Close the popup
  };


  return (
    <div className="lifeline-container">
      {/* ✅ REMOVED: The top form is no longer here */}
      <div className="timeline-wrapper">
        <div className="timeline-y-axis">
            <span>High Effort</span><span>Medium</span><span>Low Effort</span>
        </div>
        <div className="timeline-scroll-container">
            {/* ✅ ADDED: onDoubleClick handler to the main content area */}
            <div className="timeline-content" ref={timelineContentRef} onDoubleClick={handleTimelineDoubleClick}>
              <svg className="timeline-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d={pathData} className="timeline-path" />
              </svg>
              {positions.map(pos => (
                <div key={pos.id} className="timeline-event" style={{ left: `${pos.x}%`, top: `${pos.y}%` }} onMouseDown={(e) => handleMouseDown(e, pos)}>
                  <div className="event-dot"></div>
                  <div className="event-label">{pos.name}</div>
                </div>
              ))}
              <div className="timeline-x-axis">
                {/* ✅ ADDED: Render month markers */}
                {months.map(m => ( <div key={m.name+m.x} className="month-marker" style={{ left: `${m.x}%` }}>{m.name}</div> ))}
                {years.map(y => ( <div key={y.year} className="year-marker" style={{ left: `${y.x}%` }}>{y.year}</div> ))}
              </div>
            </div>
        </div>
      </div>
      {/* ✅ NEW: Conditionally render the popup */}
      {popupInfo && (
        <AddEventPopup 
            popupInfo={popupInfo}
            onSave={handlePopupSave}
            onClose={() => setPopupInfo(null)}
        />
      )}
    </div>
  );
}