import React from 'react';

export default function DayView({ date }) {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
        <div className="timetable">
            <div className="time-column">
                {hours.map(hour => (
                    <div key={hour} className="time-slot">{hour}:00</div>
                ))}
            </div>
            <div className="days-column-container" style={{ gridTemplateColumns: '1fr' }}>
                <div className="day-column">
                    <div className="day-column-header">
                        {date.toLocaleDateString(undefined, { weekday: 'long' })}
                    </div>
                    <div className='day-column-body'>
                        {hours.map(hour => <div key={hour} className="hour-line"></div>)}
                    </div>
                </div>
            </div>
        </div>
    );
}