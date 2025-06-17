import React from 'react';

// ✅ REWORKED: This view is now a timetable, not a simple grid.
export default function MonthView({ date }) {
  const getMonthDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getMonthDays();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="timetable">
      <div className="time-column">
        {hours.map(hour => (
          <div key={hour} className="time-slot">{`${hour.toString().padStart(2, '0')}:00`}</div>
        ))}
      </div>
      <div className="days-column-container">
        {days.map(day => (
          <div key={day.toISOString()} className="day-column">
            <div className="day-column-header">
              <div>{day.toLocaleDateString(undefined, { weekday: 'short' })}</div>
              <div>{day.getDate()}</div>
            </div>
            <div className='day-column-body'>
                {hours.map(hour => <div key={hour} className="hour-line"></div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}