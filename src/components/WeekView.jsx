import React from 'react';

export default function WeekView({ date }) {
  const getWeekDays = () => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startOfWeek);
      currentDay.setDate(startOfWeek.getDate() + i);
      days.push(currentDay);
    }
    return days;
  };

  const days = getWeekDays();
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="timetable">
      <div className="time-column">
        {hours.map(hour => (
          <div key={hour} className="time-slot">{hour}:00</div>
        ))}
      </div>
      <div className="days-column-container" style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {days.map(day => (
          <div key={day.toISOString()} className="day-column">
            <div className="day-column-header">{day.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric' })}</div>
            <div className='day-column-body'>
                {hours.map(hour => <div key={hour} className="hour-line"></div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}